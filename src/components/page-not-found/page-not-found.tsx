import "./page-not-found.css";
import {ChangeEvent, useState} from "react";
import {CtaButton, Form} from "../../components";
import {isDisabled} from "../../utils/utils";
import toast, {Toaster} from "react-hot-toast";

export const PageNotFound = () => {
  const [input, setInput] = useState({
    date: "",
    course: "",
    location: "sthlm",
  });

  const inputForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const {date, course, location} = input;

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const queryParams = `?date=${date}&name=${course}&location=${location}`;

  const copyLink = () => {
    navigator.clipboard.writeText(baseUrl + queryParams).catch(err => toast.error(err));
    toast.success("Linked copied to clipboard!");
  };

  return (
    <div className="page-not-found__container">
      <div className="page-not-found">
        <h1 className="page-not-found__title">404</h1>
        <p>Page not found. Please check the url or generate one with the form below and try again.</p>
      </div>
      <Form onChange={inputForm}/>
      <a href={queryParams}>
        <CtaButton
          variant="primary"
          disabled={isDisabled(date, course, location)}
        >
          Redirect
        </CtaButton>
      </a>
      <span className="page-not-found__url">{baseUrl + queryParams}</span>
      <CtaButton variant="info" onClick={copyLink}>
        Copy Link
      </CtaButton>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};
