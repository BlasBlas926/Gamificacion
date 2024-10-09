import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


const Menuprincipal = () => {
  return (

    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <svg
                  width="25"
                  viewBox="0 0 25 42"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                      id="path-1"
                    ></path>
                    <path
                      d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                      id="path-3"
                    ></path>
                    <path
                      d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                      id="path-4"
                    ></path>
                    <path
                      d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                      id="path-5"
                    ></path>
                  </defs>
                  <g id="g-app-brand" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                      <g id="Icon" transform="translate(27.000000, 15.000000)">
                        <g id="Mask" transform="translate(0.000000, 8.000000)">
                          <mask id="mask-2" fill="white">
                            <use href="#path-1"></use>
                          </mask>
                          <use fill="#696cff" href="#path-1"></use>
                          <g id="Path-3" mask="url(#mask-2)">
                            <use fill="#696cff" href="#path-3"></use>
                            <use fill-opacity="0.2" fill="#FFFFFF" href="#path-3"></use>
                          </g>
                          <g id="Path-4" mask="url(#mask-2)">
                            <use fill="#696cff" href="#path-4"></use>
                            <use fill-opacity="0.2" fill="#FFFFFF" href="#path-4"></use>
                          </g>
                        </g>
                        <g
                          id="Triangle"
                          transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                        >
                          <use fill="#696cff" href="#path-5"></use>
                          <use fill-opacity="0.2" fill="#FFFFFF" href="#path-5"></use>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
            </a>

            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>

          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">

            <li className="menu-item">

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="layouts-without-menu.html" className="menu-link">
                    <div data-i18n="Without menu">Without menu</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-without-navbar.html" className="menu-link">
                    <div data-i18n="Without navbar">Without navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-container.html" className="menu-link">
                    <div data-i18n="Container">Container</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-fluid.html" className="menu-link">
                    <div data-i18n="Fluid">Fluid</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-blank.html" className="menu-link">
                    <div data-i18n="Blank">Blank</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-item">

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="pages-account-settings-account.html" className="menu-link">
                    <div data-i18n="Account">Account</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-account-settings-notifications.html" className="menu-link">
                    <div data-i18n="Notifications">Notifications</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-account-settings-connections.html" className="menu-link">
                    <div data-i18n="Connections">Connections</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="auth-login-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Login</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="auth-register-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Register</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="auth-forgot-password-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Forgot Password</div>
                  </a>
                </li>
              </ul>
            </li>


            <li className="menu-item">

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="extended-ui-perfect-scrollbar.html" className="menu-link">
                    <div data-i18n="Perfect Scrollbar">Perfect scrollbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-text-divider.html" className="menu-link">
                    <div data-i18n="Text Divider">Text Divider</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-header small text-uppercase"><span className="menu-header-text">Configuración</span></li>

            <li className="menu-item">

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="forms-basic-inputs.html" className="menu-link">
                    <div data-i18n="Basic Inputs">Basic Inputs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-input-groups.html" className="menu-link">
                    <div data-i18n="Input groups">Input groups</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item active open">
              <a href="javascript:void(0);" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Layouts">Agregar Alumno</div>
              </a>
              <ul className="menu-sub">
              </ul>
            </li>

            <li className="menu-item active open">
              <a href="javascript:void(0);" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Layouts">Actualizar Alumno</div>
              </a>
              <ul className="menu-sub">
              </ul>
            </li>

            <li className="menu-item active select open">
              <a href="javascript:void(0);" className="menu-link ">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Layouts">Eliminar Alumno</div>
              </a>
              <ul className="menu-sub">
              </ul>
            </li>

            <li className="menu-item">
              <a href="tables-basic.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-table"></i>
                <div data-i18n="Tables">Tables</div>
              </a>
            </li>
          </ul>
          <div>
          </div>

        </aside>

        <div className="layout-page">

          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0"></i>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>


              <ul className="navbar-nav flex-row align-items-center ms-auto">

                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                  >Star</a>
                </li>

                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img src="../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Configuración/</span> Agregar Alumno</h4>

              <div className="row">

                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Agregart</h5>
                      <small className="text-muted float-end">Ingrese los datos del usuario</small>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="basic-default-name" placeholder="John Doe" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-company">Edad</label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="basic-default-company"
                              placeholder="ACME Inc."
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-email">Email</label>
                          <div className="col-sm-10">
                            <div className="input-group input-group-merge">
                              <input
                                type="text"
                                id="basic-default-email"
                                className="form-control"
                                placeholder="john.doe"
                                aria-label="john.doe"
                                aria-describedby="basic-default-email2"
                              />
                              <span className="input-group-text" id="basic-default-email2">@example.com</span>
                            </div>
                            <div className="form-text">You can use letters, numbers & periods</div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-phone">Phone No</label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="basic-default-phone"
                              className="form-control phone-mask"
                              placeholder="658 799 8941"
                              aria-label="658 799 8941"
                              aria-describedby="basic-default-phone"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-message">Dirección</label>
                          <div className="col-sm-10">
                            <textarea
                              id="basic-default-message"
                              className="form-control"
                              placeholder="Hi, Do you have a moment to talk Joe?"
                              aria-label="Hi, Do you have a moment to talk Joe?"
                              aria-describedby="basic-icon-default-message2"
                            ></textarea>
                          </div>
                        </div>
                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Agregar</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <hr className="my-5" />
                {/* -----TABLA------ */}
                <div className="layout-wrapper layout-content-navbar">
                  <div className="layout-container">

                    {/* <!-- Layout container --> */}
                    <div className="layout-page">

                      {/* <!-- Content wrapper --> */}
                      <div className="content-wrapper">
                        {/* <!-- Content --> */}

                        <div className="container-xxl flex-grow-1 container-p-y">
                          <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> Basic Tables</h4>

                          {/* <!-- Basic Bootstrap Table --> */}
                          <div className="card">
                            <h5 className="card-header">Table Basic</h5>
                            <div className="table-responsive text-nowrap">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Users</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                  <tr>
                                    <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>Angular Project</strong></td>
                                    <td>Albert Cook</td>
                                    <td>
                                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Lilian Fuller"
                                        >
                                          <img src="../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Sophia Wilkerson"
                                        >
                                          <img src="../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Christina Parker"
                                        >
                                          <img src="../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                      </ul>
                                    </td>
                                    <td><span className="badge bg-label-primary me-1">Active</span></td>
                                    <td>
                                      <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-trash me-1"></i> Delete</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td><i className="fab fa-react fa-lg text-info me-3"></i> <strong>React Project</strong></td>
                                    <td>Barry Hunter</td>
                                    <td>
                                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Lilian Fuller"
                                        >
                                          <img src="../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Sophia Wilkerson"
                                        >
                                          <img src="../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Christina Parker"
                                        >
                                          <img src="../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                      </ul>
                                    </td>
                                    <td><span className="badge bg-label-success me-1">Completed</span></td>
                                    <td>
                                      <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-edit-alt me-2"></i> Edit</a>
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-trash me-2"></i> Delete</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td><i className="fab fa-vuejs fa-lg text-success me-3"></i> <strong>VueJs Project</strong></td>
                                    <td>Trevor Baker</td>
                                    <td>
                                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Lilian Fuller"
                                        >
                                          <img src="../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Sophia Wilkerson"
                                        >
                                          <img src="../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Christina Parker"
                                        >
                                          <img src="../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                      </ul>
                                    </td>
                                    <td><span className="badge bg-label-info me-1">Scheduled</span></td>
                                    <td>
                                      <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-edit-alt me-2"></i> Edit</a>
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-trash me-2"></i> Delete</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <i className="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>Bootstrap Project</strong>
                                    </td>
                                    <td>Jerry Milton</td>
                                    <td>
                                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Lilian Fuller"
                                        >
                                          <img src="../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Sophia Wilkerson"
                                        >
                                          <img src="../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          className="avatar avatar-xs pull-up"
                                          title="Christina Parker"
                                        >
                                          <img src="../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle" />
                                        </li>
                                      </ul>
                                    </td>
                                    <td><span className="badge bg-label-warning me-1">Pending</span></td>
                                    <td>
                                      <div className="dropdown">
                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                          <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-edit-alt me-2"></i> Edit</a>
                                          <a className="dropdown-item" href="javascript:void(0);"
                                          ><i className="bx bx-trash me-2"></i> Delete</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* <!--/ Basic Bootstrap Table --> */}

                          <hr className="my-5" />

                        </div>
                        {/* <!-- / Content --> */}

                        <div className="content-backdrop fade"></div>
                      </div>
                      {/* <!-- Content wrapper --> */}
                    </div>
                    {/* <!-- / Layout page --> */}
                  </div>

                  {/* <!-- Overlay --> */}
                  <div className="layout-overlay layout-menu-toggle"></div>
                </div>
              </div>
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle">

      </div>
    </div>
  );

}

export default Menuprincipal