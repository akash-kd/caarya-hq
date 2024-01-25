import BreadCrumb from "components/Comman/BreadCrumb";
import React from "react";
import Header from "./Header";

const list = [
  {
    borderColor: "#FF7E6E",
    color: "#ED4C41",
    name: "Choice Based Education",
    description:
      "To help students kickstart meaningful careers by supplementing their passion, professional choices, vocational choices and goals with learning experiences.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 6V4M12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10M12 6C12.5304 6 13.0391 6.21071 13.4142 6.58579C13.7893 6.96086 14 7.46957 14 8C14 8.53043 13.7893 9.03914 13.4142 9.41421C13.0391 9.78929 12.5304 10 12 10M12 10V20M6 18C6.53043 18 7.03914 17.7893 7.41421 17.4142C7.78929 17.0391 8 16.5304 8 16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14M6 18C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16C4 15.4696 4.21071 14.9609 4.58579 14.5858C4.96086 14.2107 5.46957 14 6 14M6 18V20M6 14V4M18 18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16C20 15.4696 19.7893 14.9609 19.4142 14.5858C19.0391 14.2107 18.5304 14 18 14M18 18C17.4696 18 16.9609 17.7893 16.5858 17.4142C16.2107 17.0391 16 16.5304 16 16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14M18 18V20M18 14V4"
            stroke="#ED4C41"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#A0D3F8",
    color: "#3996E3",
    name: "Cross Domain T Skills",
    description:
      "To teach cross domain t-skills first hand and equip students with knowledge required in today’s economy. Mentored by our successful industry professionals, cross domain skills are mandatory for jobs today.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14 10L12 11M12 11L10 10M12 11V13.5M20 7L18 8M20 7L18 6M20 7V9.5M14 4L12 3L10 4M4 7L6 6M4 7L6 8M4 7V9.5M12 21L10 20M12 21L14 20M12 21V18.5M6 18L4 17V14.5M18 18L20 17V14.5"
            stroke="#3996E3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#FFE99A",
    color: "#BA7507",
    name: "Students for Startups",
    description:
      "To open up our network of successful startups to students and help them gain work experience while in college and get started as working student professionals.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.933 12.8C12.0572 12.7069 12.158 12.5861 12.2274 12.4472C12.2969 12.3084 12.333 12.1552 12.333 12C12.333 11.8448 12.2969 11.6916 12.2274 11.5528C12.158 11.4139 12.0572 11.2931 11.933 11.2L6.6 7.2C6.45143 7.08857 6.27477 7.02072 6.08981 7.00404C5.90484 6.98736 5.71889 7.02252 5.55279 7.10557C5.38668 7.18863 5.24698 7.31629 5.14935 7.47427C5.05171 7.63225 5 7.81429 5 8V16C5 16.1857 5.05171 16.3678 5.14935 16.5257C5.24698 16.6837 5.38668 16.8114 5.55279 16.8944C5.71889 16.9775 5.90484 17.0126 6.08981 16.996C6.27477 16.9793 6.45143 16.9114 6.6 16.8L11.933 12.8ZM19.933 12.8C20.0572 12.7069 20.158 12.5861 20.2274 12.4472C20.2969 12.3084 20.333 12.1552 20.333 12C20.333 11.8448 20.2969 11.6916 20.2274 11.5528C20.158 11.4139 20.0572 11.2931 19.933 11.2L14.6 7.2C14.4514 7.08857 14.2748 7.02072 14.0898 7.00404C13.9048 6.98736 13.7189 7.02252 13.5528 7.10557C13.3867 7.18863 13.247 7.31629 13.1493 7.47427C13.0517 7.63225 13 7.81429 13 8V16C13 16.1857 13.0517 16.3678 13.1493 16.5257C13.247 16.6837 13.3867 16.8114 13.5528 16.8944C13.7189 16.9775 13.9048 17.0126 14.0898 16.996C14.2748 16.9793 14.4514 16.9114 14.6 16.8L19.933 12.8Z"
            stroke="#BA7507"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#A0D3F8",
    color: "#3996E3",
    name: "Participatory Learning",
    description:
      "To nurture community driven learning experiences that give a safe space for students to grow and express themselves.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 11C19 12.8565 18.2625 14.637 16.9497 15.9497C15.637 17.2625 13.8565 18 12 18M12 18C10.1435 18 8.36301 17.2625 7.05025 15.9497C5.7375 14.637 5 12.8565 5 11M12 18V22M12 22H8M12 22H16M12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14Z"
            stroke="#3996E3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#FF7E6E",
    color: "#ED4C41",
    name: "The Caarya Network",
    description:
      "To provide network across our community of promoters, leaders, accelerators, mentors, accountability partners and teammates. Create lifelong bonds of learning and friendship here.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17.657 18.657C16.1566 20.1573 14.1217 21.0002 12 21.0002C9.87818 21.0002 7.84329 20.1573 6.34296 18.657C4.84263 17.1567 3.99976 15.1218 3.99976 13C3.99976 10.8782 4.84263 8.84333 6.34296 7.343C6.34296 7.343 6.99996 9 8.99996 10C8.99996 8 9.49996 5 11.986 3C14 5 16.09 5.777 17.656 7.343C18.4001 8.08499 18.9903 8.96674 19.3925 9.93756C19.7948 10.9084 20.0012 11.9491 20 13C20.0014 14.0508 19.7951 15.0915 19.393 16.0623C18.9909 17.0331 18.4009 17.9149 17.657 18.657Z"
            stroke="#ED4C41"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.879 16.121C10.2274 16.4695 10.6563 16.7268 11.1277 16.8702C11.5991 17.0135 12.0986 17.0386 12.5821 16.9431C13.0655 16.8476 13.5179 16.6345 13.8994 16.3226C14.2809 16.0107 14.5797 15.6096 14.7694 15.1548C14.9591 14.7001 15.0338 14.2056 14.987 13.715C14.9402 13.2245 14.7733 12.753 14.5011 12.3423C14.2288 11.9316 13.8595 11.5943 13.4259 11.3602C12.9923 11.1261 12.5078 11.0024 12.015 11L11 14H9C9 14.768 9.293 15.536 9.879 16.121Z"
            stroke="#ED4C41"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#A0D3F8",
    color: "#3996E3",
    name: "Collaborative Leadership",
    description:
      "To encourage leadership and innovation in student communities where they can collaborate with their peers across multiple domains.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.8283 10.1722C13.0782 9.42228 12.061 9.00102 11.0003 9.00102C9.93967 9.00102 8.92244 9.42228 8.17232 10.1722L4.17232 14.1722C3.79028 14.5412 3.48556 14.9825 3.27592 15.4705C3.06628 15.9586 2.95594 16.4834 2.95132 17.0146C2.94671 17.5457 3.04791 18.0724 3.24904 18.564C3.45016 19.0556 3.74717 19.5022 4.12274 19.8777C4.49832 20.2533 4.94492 20.5503 5.43651 20.7515C5.92809 20.9526 6.45481 21.0538 6.98593 21.0492C7.51705 21.0446 8.04193 20.9342 8.52994 20.7246C9.01796 20.5149 9.45934 20.2102 9.82832 19.8282L10.9303 18.7272M10.1723 13.8282C10.9224 14.578 11.9397 14.9993 13.0003 14.9993C14.061 14.9993 15.0782 14.578 15.8283 13.8282L19.8283 9.82816C20.557 9.07376 20.9601 8.06335 20.951 7.01456C20.9419 5.96577 20.5212 4.96252 19.7796 4.22089C19.038 3.47926 18.0347 3.05858 16.9859 3.04947C15.9371 3.04035 14.9267 3.44353 14.1723 4.17216L13.0723 5.27216"
            stroke="#3996E3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#FFE99A",
    color: "#BA7507",
    name: "Student Entrepreneurship",
    description:
      "To give voice and credibility to student contributions in college and enable their efforts to be recognized pan India.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.663 17H14.336M12 3V4M18.364 5.636L17.657 6.343M21 12H20M4 12H3M6.343 6.343L5.636 5.636M8.464 15.536C7.76487 14.8367 7.2888 13.9458 7.09598 12.9759C6.90316 12.006 7.00225 11.0008 7.38073 10.0872C7.75921 9.17366 8.40007 8.39284 9.22229 7.84349C10.0445 7.29414 11.0111 7.00093 12 7.00093C12.9889 7.00093 13.9555 7.29414 14.7777 7.84349C15.5999 8.39284 16.2408 9.17366 16.6193 10.0872C16.9977 11.0008 17.0968 12.006 16.904 12.9759C16.7112 13.9458 16.2351 14.8367 15.536 15.536L14.988 16.083C14.6747 16.3963 14.4262 16.7683 14.2567 17.1777C14.0872 17.5871 13.9999 18.0259 14 18.469V19C14 19.5304 13.7893 20.0391 13.4142 20.4142C13.0391 20.7893 12.5304 21 12 21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19V18.469C10 17.574 9.644 16.715 9.012 16.083L8.464 15.536Z"
            stroke="#BA7507"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#A0D3F8",
    color: "#3996E3",
    name: "A Community for Change",
    description:
      "To promote awarness about social issues and help students use their skills to work on impact projects.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.31804 6.31804C3.90017 6.7359 3.5687 7.23198 3.34255 7.77795C3.1164 8.32392 3 8.90909 3 9.50004C3 10.091 3.1164 10.6762 3.34255 11.2221C3.5687 11.7681 3.90017 12.2642 4.31804 12.682L12 20.364L19.682 12.682C20.526 11.8381 21.0001 10.6935 21.0001 9.50004C21.0001 8.30656 20.526 7.16196 19.682 6.31804C18.8381 5.47412 17.6935 5.00001 16.5 5.00001C15.3066 5.00001 14.162 5.47412 13.318 6.31804L12 7.63604L10.682 6.31804C10.2642 5.90017 9.7681 5.5687 9.22213 5.34255C8.67616 5.1164 8.09099 5 7.50004 5C6.90909 5 6.32392 5.1164 5.77795 5.34255C5.23198 5.5687 4.7359 5.90017 4.31804 6.31804Z"
            stroke="#3996E3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
  {
    borderColor: "#FF7E6E",
    color: "#ED4C41",
    name: "The Student Currency",
    description:
      "To promote a culture where in student contributions can be monetized, validated and accounted for.",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 8H15M10 8C10.394 8 10.7841 8.0776 11.1481 8.22836C11.512 8.37913 11.8427 8.6001 12.1213 8.87868C12.3999 9.15726 12.6209 9.48797 12.7716 9.85195C12.9224 10.2159 13 10.606 13 11C13 11.394 12.9224 11.7841 12.7716 12.1481C12.6209 12.512 12.3999 12.8427 12.1213 13.1213C11.8427 13.3999 11.512 13.6209 11.1481 13.7716C10.7841 13.9224 10.394 14 10 14H9L12 17M9 11H15M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
            stroke="#ED4C41"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </>
    ),
  },
];

function What() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="What is Caarya?"
      />{" "}
      <div className="px-5 py-10 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-16">
          <Header
            name="What is Caarya?"
            image="/assets/images/essentials/foundation/1.png"
            description={
              <>
                Caarya is an ecosystem of Indian students, startups and
                promoters who aim to supplement knowledge, skills, values,
                beliefs, habits and attitudes with learning experiences.
                <br />
                <br />
                We do this by setting up centers of excellence in various
                colleges across India where students learn, train, become
                masters and earn through our various work study programs.
              </>
            }
          />

          <div className="py-10 flex flex-col space-y-10">
            {[
              {
                svg: (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_97_11454)">
                        <path
                          d="M24.6831 39.5H39.3169V43.25H24.6831V39.5Z"
                          fill="#C63434"
                        />
                        <path
                          d="M30.125 30.125H33.875V58.25H30.125V30.125Z"
                          fill="#ED4C41"
                        />
                        <path
                          d="M18.6846 57.9478L15.3154 56.3037L28.6709 28.9238L32.04 30.5684L18.6846 57.9478Z"
                          fill="#ED4C41"
                        />
                        <path
                          d="M45.3154 57.9478L31.96 30.5684L35.3291 28.9238L48.6846 56.3037L45.3154 57.9478Z"
                          fill="#ED4C41"
                        />
                        <path
                          d="M1.875 17H9.375V20.75H1.875V17Z"
                          fill="#FF7E6E"
                        />
                        <path
                          d="M1.875 18.875H9.375V20.75H1.875V18.875Z"
                          fill="#C63434"
                        />
                        <path
                          d="M7.5 13.25H20.75V24.5H7.5V13.25Z"
                          fill="#A5F2F2"
                        />
                        <path
                          d="M7.5 18.875H20.75V24.5H7.5V18.875Z"
                          fill="#0497AE"
                        />
                        <path
                          d="M56.5 13.25V24.5L52.75 28.25H18.875V9.5H52.75L56.5 13.25Z"
                          fill="#FF7E6E"
                        />
                        <path
                          d="M18.875 18.875H56.5V24.5L52.75 28.25H18.875V18.875Z"
                          fill="#C63434"
                        />
                        <path
                          d="M52.75 9.5H62.125V28.25H52.75V9.5Z"
                          fill="#A5F2F2"
                        />
                        <path
                          d="M52.75 18.875H62.125V28.25H52.75V18.875Z"
                          fill="#0497AE"
                        />
                        <path
                          d="M32 32C28.8984 32 26.375 29.4766 26.375 26.375C26.375 23.2734 28.8984 20.75 32 20.75C35.1016 20.75 37.625 23.2734 37.625 26.375C37.625 29.4766 35.1016 32 32 32Z"
                          fill="#0497AE"
                        />
                        <path d="M0 13.25H3.75V24.5H0V13.25Z" fill="#A5F2F2" />
                        <path
                          d="M60.25 5.75H64V32H60.25V5.75Z"
                          fill="#FF7E6E"
                        />
                        <path
                          d="M0 18.875H3.75V24.5H0V18.875Z"
                          fill="#0497AE"
                        />
                        <path
                          d="M60.25 18.875H64V32H60.25V18.875Z"
                          fill="#C63434"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_97_11454">
                          <rect width="64" height="64" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                ),
                name: "Our Vision",
                description:
                  "Drive the Indian Startup Industry by creating and nourishing impact startups ",
              },
              {
                svg: (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_97_11477)">
                        <path
                          d="M54.9396 54.9465C67.0045 42.8816 67.0045 23.3205 54.9396 11.2557C42.8747 -0.80924 23.3136 -0.809244 11.2487 11.2557C-0.81615 23.3205 -0.81615 42.8816 11.2487 54.9465C23.3136 67.0114 42.8747 67.0114 54.9396 54.9465Z"
                          fill="#FF6C6C"
                        />
                        <path
                          d="M33.1011 2.20215V63.9995C50.1387 63.9995 63.9998 50.1384 63.9998 33.1008C63.9998 16.0632 50.1387 2.20215 33.1011 2.20215Z"
                          fill="#E63950"
                        />
                        <path
                          d="M36.4721 53.3482C47.654 51.477 55.2017 40.8954 53.3305 29.7135C51.4593 18.5317 40.8777 10.9839 29.6959 12.8551C18.5141 14.7263 10.9664 25.3079 12.8376 36.4897C14.7088 47.6716 25.2903 55.2194 36.4721 53.3482Z"
                          fill="#F0F7FF"
                        />
                        <path
                          d="M33.1011 12.5669V53.6349C44.4235 53.6349 53.6351 44.4233 53.6351 33.1008C53.6351 21.7785 44.4235 12.5669 33.1011 12.5669Z"
                          fill="#DFE7F4"
                        />
                        <path
                          d="M42.1656 37.729C44.7154 32.7249 42.7258 26.6012 37.7217 24.0514C32.7175 21.5016 26.5939 23.4913 24.0441 28.4954C21.4943 33.4995 23.4839 39.6232 28.488 42.173C33.4921 44.7228 39.6158 42.7332 42.1656 37.729Z"
                          fill="#FF6C6C"
                        />
                        <path
                          d="M33.1011 22.9316V43.2701C38.7085 43.2701 43.2704 38.7083 43.2704 33.1008C43.2704 27.4934 38.7085 22.9316 33.1011 22.9316Z"
                          fill="#E63950"
                        />
                        <path
                          d="M22.8869 9.62871L13.8077 0.549543C13.356 0.0975813 12.7051 -0.0934168 12.0808 0.0425098C11.4565 0.178436 10.9441 0.622638 10.7209 1.22142L8.86265 6.20727L9.39347 9.39316L6.20758 8.86234L1.22185 10.7205C0.623077 10.9437 0.178875 11.4561 0.0429486 12.0804C-0.0928528 12.7047 0.0980201 13.3554 0.549982 13.8073L9.62915 22.8864C9.98436 23.2418 10.4632 23.4364 10.9566 23.4364C11.0679 23.4364 11.1799 23.4265 11.2916 23.4064L20.2671 21.7792C21.0371 21.6396 21.6399 21.0368 21.7796 20.2668L23.4067 11.2912C23.5164 10.6855 23.3223 10.0642 22.8869 9.62871Z"
                          fill="#116E84"
                        />
                        <path
                          d="M34.4287 31.7735L8.86259 6.20752L8.14178 8.14178L6.20752 8.86259L31.7736 34.4287C32.1402 34.7953 32.6207 34.9785 33.1011 34.9785C33.5816 34.9785 34.0621 34.7952 34.4286 34.4287C35.1619 33.6955 35.1619 32.5067 34.4287 31.7735Z"
                          fill="#0497AE"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_97_11477">
                          <rect width="64" height="64" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                ),
                name: "Our Mission",
                description:
                  "Enriching the startup landscape by establishing growth centers which empower an ecosystem of students, entrepreneurs, promoters and skill experts.",
              },
            ]?.map((item) => {
              return (
                <div className="flex flex-row items-center space-x-8">
                  {React.cloneElement(item?.svg, {})}
                  <div className="flex flex-col w-9/12 space-y-2">
                    <h1 className="text-black font-satoshi text-lg font-medium capitalize tracking-[0.9px] leading-8">
                      {item?.name}
                    </h1>
                    <p className="text-primary-neutral-800 font-lato text-sm font-light leading-5 tracking-[0.7px]">
                      {item?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col space-y-8">
            <h1 className="text-black font-satoshi text-lg font-medium leading-7 tracking-[0.9px] capitalize">
              Our Focus Points
            </h1>
            {list?.map((item) => {
              return (
                <div
                  style={{
                    borderColor: item?.borderColor,
                    boxShadow:
                      "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
                  }}
                  className={`bg-white border border-[${item?.borderColor}] rounded-2xl p-5 flex flex-col space-y-4`}
                >
                  {React.cloneElement(item?.svg, {})}
                  <h1
                    style={{
                      color: item?.color,
                    }}
                    className="font-lato text-base font-bolf leading-6"
                  >
                    {item?.name}
                  </h1>
                  <p className="text-primary-neutral-500 font-lato text-sm font-light leading-5 tracking-[0.7px]">
                    {item?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default What;
