import React, { useRef, useState } from "react";
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import './add-club.css';
import ContactsPage from "./contacts-page";
import OverviewPage from "./overview-page";
import FaqPage from "./faq-page";
import SignUpPage from "./sign-up-page";

function AddService() {
  const allPossiblePages = [
    "Overview",
    "Contacts",
    "FAQ",
    "Sign Up"
  ];

  const [allCurrentPages, setAllCurrentPages] = useState([
    "Overview",
    "Sign Up"
  ]);

  const removablePages = ["Contacts", "FAQ"];

  const [showAddButtons, setShowAddButtons] = useState(false);

  const [activePage, setActivePage] = useState("Overview");
  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

  const changeVisibility = (page) => {
    setActivePage(page);
    Object.keys(pageRefs.current).forEach((key) => {
      const ref = pageRefs.current[key].current;
      if (!ref) return;
      ref.style.borderColor = key === page ? '#001E60' : 'white';
    });
  };

  const deletePage = (pageToRemove) => {
    if (removablePages.includes(pageToRemove)) {
      if (activePage === pageToRemove) {
        changeVisibility("Overview");
      }
      const newArray = allCurrentPages.filter((page) => page !== pageToRemove);
      setAllCurrentPages(newArray);
    }
  };

  const addPage = (pageToAdd) => {
    setAllCurrentPages((prevPages) => {
      const insertIndex = prevPages.findIndex(
        (page) => allPossiblePages.indexOf(page) > allPossiblePages.indexOf(pageToAdd)
      );
      if (insertIndex === -1) {
        return [...prevPages, pageToAdd];
      }
      const updatedPages = [...prevPages];
      updatedPages.splice(insertIndex, 0, pageToAdd);
      return updatedPages;
    });
  };
  // these three are 
  function disapear() {
    setShowAddButtons(false);
  }

  function hide() {
    setTimeout(disapear, 250);
  }

  const toggleAddButtons = () => {
    setShowAddButtons((prevState) => !prevState)
  };

  return (
    <div>
      <NavBar isFixedPage={false} />
      <form action="/store-service" method="POST" className="service-container" id='form'>
        <div className="service-title">
          <input type="text" placeholder="Name of the Club" className="club-title-text-box" name="title" id='title' /><br />
        </div>

        <div className="service-navbar">
          {allCurrentPages.map((page) => (
            <div className="service-navbar-text" key={page} id={page === "OverviewPage" ? "" : `remove${page}`}>
              <a href="#" className="service-navbar-link" ref={pageRefs.current[page]} onClick={() => changeVisibility(page)}>{page}</a>
              {removablePages.includes(page) && <i className="fa-solid fa-circle-xmark" id="remove-service-navbar-text" onClick={() => deletePage(page)}></i>}
            </div>
          ))}

          <div
        className="service-navbar-plus-container"
        onClick={toggleAddButtons}
        onBlur={hide}
        tabIndex="0"
      >
        <i className="fa-solid fa-circle-plus fa-2x" id="service-navbar-plus">
        {showAddButtons && (
          <div className="add-buttons-container">
            {allPossiblePages
              .filter((page) => !allCurrentPages.includes(page))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => addPage(page)}
                  className="add-page-button"
                >
                  Add {page}
                </button>
              ))}
          </div>
        )}
        </i>
      </div>
        </div>

        {activePage === "Overview" && <OverviewPage key="OverviewPage" />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" />}

      </form>
    </div>
  );
}

export default AddService;
