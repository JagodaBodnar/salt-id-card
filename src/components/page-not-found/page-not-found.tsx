import "./page-not-found.css";
import { ChangeEvent, useState } from "react";
import { CtaButton, Form } from "../../components";
import { isDisabled } from "../../utils/utils";

export const PageNotFound = () => {
  const [input, setInput] = useState({
    date: "",
    course: "",
    location: "sthlm",
  });

  const inputForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const { date, course, location } = input;

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const queryParams = `?date=${date}&name=${course}&location=${location}`;

  return (
    <div className="page-not-found__container">
      <div className="page-not-found">
        Invalid url Page not found. Please check the url and try again.
      </div>
      <Form
        onChange={inputForm}
      />
      <a href={queryParams}>
        <CtaButton
          variant="primary"
          disabled={isDisabled(date, course, location)}
        >
          Redirect
        </CtaButton>
      </a>
      <span>{baseUrl + queryParams}</span>
    </div>
  );
};
