import { PlusCircleIcon } from "@heroicons/react/outline";
import EmptyState from "components/Comman/EmptyState";
import img from "assets/svg/task.svg";
import { gapi } from "gapi-script";
import ChronosButton from "components/Comman/Buttons";

function TaskDocuments({ taskDocuments = [] }) {
  // The Browser API key obtained from the Google API Console.
  // Replace with your own Browser API key, or your own key.
  var developerKey = "AIzaSyDJ8XalZNiJGO-pyCVQU9oV4m7fY1-4kxw";

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  var clientId =
    "95296662175-i8k3q6erlfcsn0pbapioirmr312h4ms4.apps.googleusercontent.com";

  // Replace with your own project number from console.developers.google.com.
  // See "Project number" under "IAM & Admin" > "Settings"
  var appId = "95296662175";

  // Scope to use to access user's Drive items.
  var scope = ["https://www.googleapis.com/auth/drive.file"];

  var pickerApiLoaded = false;
  var oauthToken;

  // Use the Google API Loader script to load the window.google.picker script.
  function loadPicker() {
    console.log("loadpicker");
    gapi.load("auth", { callback: onAuthApiLoad });
    gapi.load("picker", { callback: onPickerApiLoad });
  }

  function onAuthApiLoad() {
    console.log("onAuthApiLoad");
    window.gapi.auth.authorize(
      {
        client_id: clientId,
        scope: scope,
        immediate: false,
      },
      handleAuthResult
    );
  }

  function onPickerApiLoad() {
    pickerApiLoaded = true;
    console.log("onPickerApiLoad", pickerApiLoaded);
    createPicker();
  }

  function handleAuthResult(authResult) {
    console.log("handleAuthResult", authResult);
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      createPicker();
    }
  }

  // Create and render a Picker object for searching images.
  function createPicker() {
    if (pickerApiLoaded && oauthToken) {
      var view = new window.google.picker.View(
        window.google.picker.ViewId.DOCS
      );
      view.setMimeTypes("image/png,image/jpeg,image/jpg");
      var picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .enableFeature(window.google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(
          new window.google.picker.DocsUploadView().setIncludeFolders(true)
        )
        .addView(
          new window.google.picker.DocsView()
            .setIncludeFolders(true)
            .setSelectFolderEnabled(true)
        )
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }

  // A simple callback implementation.
  function pickerCallback(data) {
    if (data.action == window.google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
      console.log("The user selected: ", fileId);
      console.log("Selected: ", data);
    }
  }

  return (
    <div className="w-full px-7.5 h-75vh flex flex-row items-center justify-center">
      {taskDocuments?.length == 0 && (
        <div className="w-full flex flex-row items-center justify-center">
          <div
            onClick={() => loadPicker()}
            className={`mt-6 relative flex flex-col justify-center items-center max-h-max w-full rounded-lg p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent`}
          >
            <div className="relative block w-full text-center">
              <img
                src="/assets/images/empty/noDocument.svg"
                alt=""
                className="w-2/3 mx-auto"
              />
              <div className="flex flex-row items-center justify-center mt-5">
                <ChronosButton
                  tertiary
                  text="Add a document"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {taskDocuments?.length !== 0 && (
        <div className="w-full fixed bottom-20">
          <div className="w-11/12 ml-1.5">
            <div
              style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)" }}
              className="flex flex-row items-center justify-between px-2 h-12 border bg-primary-yellow-medium rounded-full w-full"
            >
              <div className="flex flex-row items-center space-x-2.5">
                <img src={img} className="h-8 w-8" alt="" />
                <p className="text-left font-karla font-bold text-sm leading-5 text-primary-gray-350">
                  Add a Document
                </p>
              </div>
              <PlusCircleIcon
                onClick={() => loadPicker()}
                className="text-white h-8"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDocuments;
