// DRIVE API IS DISABLED

import EmptyState from "components/Comman/EmptyState";
import { gapi } from "gapi-script";

function TD() {
  // Client ID and API key from the Developer Console
  var CLIENT_ID =
    "95296662175-i8k3q6erlfcsn0pbapioirmr312h4ms4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyDJ8XalZNiJGO-pyCVQU9oV4m7fY1-4kxw";

  //   // Array of API discovery doc URLs for APIs used by the quickstart
  //   var DISCOVERY_DOCS = [
  //     "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  //   ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/drive";

  var authorizeButton = document.getElementById("authorize_button");
  var signoutButton = document.getElementById("signout_button");

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    console.log("load");
    gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    console.log("init");
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          console.log("mm", gapi.auth2.getAuthInstance());
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

          handleAuthClick();
          //   signoutButton.onclick = handleSignoutClick;
        },
        function (error) {
          console.log(error);
        }
      );
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = async (isSignedIn) => {
    console.log("updtaesignin", isSignedIn);
    if (isSignedIn) {
      await gapi.client.load("drive", "v3").then(function (drive) {
        console.log("drive loaded");
      });
      //   authorizeButton.style.display = "none";
      //   signoutButton.style.display = "block";
      listFiles();
    } else {
      //   authorizeButton.style.display = "block";
      //   signoutButton.style.display = "none";
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */

  /**
   * Print files.
   */
  function listFiles() {
    console.log("list");
    console.log(gapi);
    console.log(gapi.client);
    console.log(gapi.client.drive);
    console.log(gapi.client.drive.files);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
      })
      .then(function (response) {
        console.log(response);
        console.log("Files:");
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file.name, " (", file.id, ")");
          }
        } else {
          console.log("No files found.");
        }
      })
      .catch((e) => {
        console.log("err", e);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-80vh">
      <p className="py-10" onClick={() => handleClientLoad()}>
        Picker
      </p>
      <div id="signout_button" />
      <div id="authorize_button" />
      <EmptyState text="The task has no documents yet!" />
    </div>
  );
}

export default TD;
