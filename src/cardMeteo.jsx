import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "moment/locale/ar"; // Arabe
import "moment/locale/en-gb"; // Anglais
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale for moment.js
import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "./weatherApiSlice"; // Import the action to change the result

export default function CardMeteo({ temp }) {
  const dispatch = useDispatch();
  const result = useSelector((state) => {
    console.log("the weather result is : ", state);
    return state.result;
  });


  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const [dateAndTime, setDateAndTime] = useState("");

  useEffect(() => {
    // Définit la langue initiale à l’arabe
    console.log("the weather result is : ", result);
    dispatch(changeResult());
    i18n.changeLanguage("ar");
    moment.locale("ar");
    setDateAndTime(moment().format("dddd, D MMMM YYYY - h:mm:ss A"));
  }, []);

  const handleLanguageClick = () => {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en-gb");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("dddd, D MMMM YYYY - h:mm:ss A"));
  };

  return (
    <>
      <Card
        style={{ padding: "10px", marginTop: "20px" }}
   
        direction={locale === "ar" ? "rtl" : "ltr"}
        sx={{
          minWidth: 275,
          backgroundColor: "#0000CD",
          borderRadius: 2,
          marginTop: 0,
          color: "white",
          maxHeight: 310,
        }}
      >
        <CardContent style={{ padding: "0" }}>
          <span
            style={{
              fontSize: 50,
              fontFamily: "IBM",
            }}
          >
            {t("Tanger")}{" "}
          </span>{" "}
          <span
            style={{
              fontSize: "18",
              fontWeight: "normal",
              marginRight: "20px",
            }}
          >
            {dateAndTime}
          </span>
        </CardContent>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <CloudIcon style={{ fontSize: "200" }} />
          </div>
          <div style={{ textAlign: "end" }}>
            <div style={{ display: "flex" }}>
              <div>
                {temp.icon && (
                  <img
                    src={temp.icon}
                    alt=""
                    style={{
                      fontSize: "20",
                      marginTop: "30",
                      marginLeft: "30px",
                    }}
                  />
                )}
              </div>
              <CardContent sx={{ fontSize: 50, fontFamily: "IBM" }}>
                {temp.temp}°C
              </CardContent>
            </div>
            <CardContent sx={{ fontSize: 16, fontFamily: "IBM" }}>
              {" "}
              {t(temp.description)}{" "}
            </CardContent>
            <CardContent sx={{ fontSize: 10, fontFamily: "IBM" }}>
              {" "}
              <span>
                {" "}
                {temp.min} : {t("min")} :{" "}
              </span>{" "}
              <span>
                {" "}
                {temp.max} : {t("max")}{" "}
              </span>
            </CardContent>
          </div>
        </div>
      </Card>

      <button
        style={{
          textAlign: "end",
          color: "white",
          backgroundColor: "rgb(65, 105, 225)",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
          fontSize: "16px",
        }}
        onClick={handleLanguageClick}
      >
        {locale === "ar" ? "العربية" : "English"}
      </button>
    </>
  );
}
