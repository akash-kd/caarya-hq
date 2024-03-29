import EmptyState from "components/Comman/EmptyState";
import moment from "moment";
import React from "react";

function ProductsChronicles({ list }) {
  return (
    <div className="flex flex-col items-stretch">
      {list?.length > 0 ? (
        list?.map((item) => {
          return (
            <div className="py-5 px-2 border-b border-primary-neutral-300 flex flex-row items-start space-x-5">
              <div className="w-10 h-10 rounded-full bg-primary-gray-80">
                <img
                  src={item?.product?.image?.url}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-stretch space-y-3 text-primary-gray-800 font-lato w-10/12">
                <p className="text-base font-light">{item?.description}</p>
                <div className="flex flex-row w-full items-center justify-between">
                  <p className="text-2xs font-semibold">
                    {item?.product?.name}
                  </p>
                  <p className="text-2xs font-light">
                    {moment(item?.createdAt).format("LL")}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="121"
              viewBox="0 0 120 121"
              fill="none"
            >
              <g clip-path="url(#clip0_4571_111235)">
                <path
                  d="M112.978 64.2061C112.863 62.8574 111.995 61.75 110.713 61.3157L100.309 57.7926L110.437 46.1722C111.11 45.4009 111.391 44.3809 111.21 43.374C111.028 42.3671 110.407 41.51 109.507 41.0225L96.4403 33.9427C95.5865 33.4803 94.5201 33.7971 94.0572 34.6507C93.5947 35.5043 93.9118 36.5712 94.7652 37.0336L107.653 44.0162L96.8591 56.3994L62.7665 37.9275L69.0926 30.6701C69.8205 30.9373 70.6066 31.083 71.426 31.083C73.9702 31.083 76.1909 29.6761 77.3541 27.6002L87.1227 32.8929C87.3889 33.037 87.6756 33.1055 87.9585 33.1055C88.5828 33.1055 89.1873 32.7722 89.5058 32.1846C89.9682 31.331 89.6511 30.2641 88.7975 29.8017L78.2121 24.0668C78.0928 20.4257 75.0959 17.5 71.4262 17.5C67.6814 17.5 64.6347 20.5467 64.6347 24.2915C64.6347 25.9404 65.2258 27.4533 66.2064 28.631L59.9992 35.7523L49.002 23.136C47.9638 21.9447 46.2685 21.6384 44.8784 22.3912L40.5797 24.7202C40.0761 20.737 36.6689 17.6455 32.5512 17.6455C28.0877 17.6455 24.4563 21.277 24.4563 25.7407C24.4563 28.2087 25.5679 30.4209 27.3152 31.9069L10.4907 41.0225C9.59119 41.51 8.97103 42.3669 8.78892 43.374C8.60728 44.3809 8.88853 45.4009 9.56096 46.172L19.6893 57.7923L9.28557 61.3153C8.00329 61.7496 7.1354 62.857 7.02055 64.2056C6.90571 65.5542 7.57368 66.7926 8.76384 67.4374L20.9812 74.0567V80.6916C20.9812 81.6624 21.768 82.4494 22.739 82.4494C23.71 82.4494 24.4968 81.6624 24.4968 80.6916V75.9614L41.5894 85.2221C42.3186 85.6173 43.1321 85.8181 43.9487 85.8181C44.4826 85.8181 45.0181 85.7321 45.5319 85.5582L58.2416 81.2548V116.229L25.2459 98.3512C24.7839 98.1009 24.4971 97.619 24.4971 97.0935V89.3694C24.4971 88.3986 23.7103 87.6116 22.7392 87.6116C21.7682 87.6116 20.9814 88.3986 20.9814 89.3694V97.0935C20.9814 98.9104 21.9735 100.577 23.571 101.442L57.6433 119.903C58.3811 120.303 59.1904 120.503 59.9997 120.503C60.809 120.503 61.6183 120.303 62.3561 119.903L96.4283 101.442C98.0256 100.577 99.018 98.9104 99.018 97.0935V74.0564L111.235 67.4372C112.425 66.7931 113.093 65.5549 112.978 64.2061ZM63.8852 50.6071C70.0385 52.3368 74.336 58.011 74.336 64.406C74.336 66.1868 74.0161 67.9151 73.3838 69.5526L59.9992 76.8045L46.6147 69.5526C45.9826 67.9151 45.6624 66.1868 45.6624 64.406C45.6624 57.9913 49.9764 52.3122 56.1536 50.5953C57.0887 50.3354 57.6362 49.3663 57.3763 48.4311C57.1166 47.4957 56.147 46.9485 55.2121 47.2081C47.5196 49.3464 42.147 56.4182 42.147 64.406C42.147 65.3693 42.2251 66.3201 42.3751 67.2558L26.429 58.6159L59.9997 40.4269L93.5701 58.6162L77.6241 67.256C77.7741 66.3204 77.8521 65.3695 77.8521 64.4062C77.8521 56.4428 72.5002 49.3768 64.837 47.2227C63.9023 46.9597 62.9317 47.5049 62.6692 48.4391C62.4058 49.3738 62.9503 50.3443 63.8852 50.6071ZM71.426 21.0161C73.2323 21.0161 74.7021 22.4857 74.7021 24.292C74.7021 26.0983 73.2323 27.5681 71.426 27.5681C69.6197 27.5681 68.1501 26.0983 68.1501 24.292C68.1501 22.4857 69.6197 21.0161 71.426 21.0161ZM32.5512 21.1617C35.0761 21.1617 37.1307 23.216 37.1307 25.7411C37.1307 28.2661 35.0761 30.3206 32.5512 30.3206C30.0262 30.3206 27.9719 28.2663 27.9719 25.7411C27.9719 23.216 30.0262 21.1617 32.5512 21.1617ZM31.3109 33.7411C31.7154 33.8037 32.1295 33.8363 32.5512 33.8363C35.8273 33.8363 38.6527 31.879 39.9256 29.0735L46.438 25.5452L57.2315 37.928L23.1388 56.3999L12.3451 44.0166L31.3109 33.7411ZM44.4041 82.2289C44.0281 82.3564 43.6123 82.3205 43.264 82.1316L23.5842 71.4691C23.579 71.4663 23.5736 71.4635 23.5685 71.4607L10.7682 64.5255L22.5756 60.5273L55.6204 78.4313L44.4041 82.2289ZM95.5016 97.0942C95.5016 97.6197 95.2145 98.1016 94.7528 98.3519L61.757 116.23V81.2555L74.4668 85.5589C74.9806 85.7328 75.5161 85.8188 76.0503 85.8188C76.8664 85.8188 77.6801 85.6177 78.4093 85.2228L95.5019 75.9621V97.0942H95.5016ZM76.7342 82.1316C76.3859 82.3205 75.9701 82.3564 75.5942 82.2289L64.3781 78.4313L97.4228 60.5273L109.23 64.5255L76.7342 82.1316ZM109.585 64.6457C109.585 64.6457 109.585 64.6455 109.584 64.6455L109.585 64.6457Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M73.1445 100.033L69.1121 102.218C68.2585 102.68 67.9416 103.747 68.404 104.601C68.7223 105.188 69.327 105.522 69.9514 105.522C70.234 105.522 70.5211 105.453 70.7871 105.309L74.8196 103.124C75.6732 102.662 75.99 101.595 75.5276 100.741C75.0652 99.8877 73.9988 99.5703 73.1445 100.033Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M39.3019 15.3011C39.6453 15.6442 40.0953 15.816 40.545 15.816C40.9948 15.816 41.4448 15.6445 41.7882 15.3011L43.2382 13.851L44.6883 15.3011C45.0317 15.6442 45.4817 15.816 45.9314 15.816C46.3812 15.816 46.8312 15.6445 47.1746 15.3011C47.8611 14.6146 47.8611 13.5016 47.1746 12.8153L45.7243 11.365L47.1746 9.91471C47.8611 9.22822 47.8611 8.11518 47.1746 7.42893C46.4878 6.74244 45.375 6.74244 44.6886 7.42893L43.2385 8.879L41.7884 7.42893C41.1017 6.74244 39.9889 6.74244 39.3024 7.42893C38.6159 8.11541 38.6159 9.22846 39.3024 9.91471L40.7527 11.365L39.3024 12.8153C38.6154 13.5016 38.6154 14.6146 39.3019 15.3011Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M91.3429 26.8167C91.6863 27.1599 92.1363 27.3317 92.5861 27.3317C93.0358 27.3317 93.4858 27.1601 93.8292 26.8167L95.2793 25.3667L96.7293 26.8167C97.0727 27.1599 97.5227 27.3317 97.9725 27.3317C98.4222 27.3317 98.8722 27.1601 99.2156 26.8167C99.9021 26.1303 99.9021 25.0172 99.2156 24.331L97.7653 22.8806L99.2156 21.4303C99.9021 20.7438 99.9021 19.6308 99.2156 18.9446C98.5289 18.2581 97.4161 18.2581 96.7296 18.9446L95.2795 20.3946L93.8294 18.9446C93.1427 18.2581 92.0299 18.2581 91.3434 18.9446C90.6569 19.631 90.6569 20.7441 91.3434 21.4303L92.7937 22.8806L91.3434 24.331C90.6564 25.0172 90.6564 26.1303 91.3429 26.8167Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M81.6389 15.8166C85.8619 15.8166 89.2973 12.3812 89.2973 8.15844C89.2971 3.93547 85.8616 0.5 81.6389 0.5C77.4162 0.5 73.9805 3.93547 73.9805 8.15844C73.9805 12.3812 77.4159 15.8166 81.6389 15.8166ZM81.6389 4.01562C83.9231 4.01562 85.7817 5.87398 85.7817 8.15844C85.7817 10.4427 83.9231 12.301 81.6389 12.301C79.3547 12.301 77.4961 10.4427 77.4961 8.15844C77.4961 5.87398 79.3547 4.01562 81.6389 4.01562Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M59.7998 66.2427C58.1062 66.2427 56.5077 66.8042 55.2965 67.8256C54.5545 68.4514 54.46 69.5605 55.086 70.3025C55.7116 71.0448 56.8206 71.139 57.5629 70.5132C58.1324 70.033 58.9471 69.758 59.8 69.758H59.8117C60.6688 69.7606 61.4866 70.0407 62.0559 70.5266C62.387 70.8092 62.7927 70.9473 63.1961 70.9473C63.6927 70.9473 64.1863 70.738 64.5339 70.3306C65.1641 69.5923 65.0765 68.4826 64.3382 67.8523C63.1279 66.8192 61.5238 66.2473 59.8218 66.2422C59.8145 66.2427 59.807 66.2427 59.7998 66.2427Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M52.3642 61.0393H52.3478C51.3761 61.025 50.593 61.8143 50.586 62.7849C50.5794 63.7557 51.369 64.5481 52.3398 64.5549H52.3522C53.3171 64.5549 54.103 63.7758 54.1098 62.8093C54.1166 61.8385 53.3352 61.0461 52.3642 61.0393Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
                <path
                  d="M67.3067 64.5186C67.3128 64.5198 67.3191 64.5205 67.3252 64.5216C67.3758 64.5315 67.4272 64.5397 67.4792 64.5451C67.4961 64.5467 67.5132 64.5467 67.53 64.5479C67.5692 64.5507 67.6083 64.5545 67.6484 64.5547H67.6608C67.7213 64.5547 67.7811 64.5516 67.8401 64.5456C68.7277 64.4567 69.4205 63.7077 69.4205 62.7966C69.4205 61.8976 68.7453 61.1577 67.8746 61.0529C67.8666 61.052 67.8589 61.0501 67.8509 61.0494C67.8108 61.0452 67.7698 61.044 67.7288 61.0423C67.71 61.0416 67.6918 61.0393 67.6728 61.0391H67.6636C67.6634 61.0391 67.6629 61.0391 67.6627 61.0391H67.6564H67.6461C67.6454 61.0391 67.6447 61.0391 67.644 61.0391C66.679 61.0391 65.9014 61.8181 65.8946 62.7847C65.8887 63.6385 66.499 64.3538 67.3067 64.5186Z"
                  fill="currentColor"
                  fill-opacity="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_4571_111235">
                  <rect
                    width="120"
                    height="120"
                    fill="currentColor"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          text="No Product Updates found!"
        />
      )}
    </div>
  );
}

export default ProductsChronicles;
