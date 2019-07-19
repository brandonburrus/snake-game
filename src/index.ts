import { createElement } from "react";
import { render } from "react-dom";
import App from "./App";
import "./reset.css";
import { unregister } from "./serviceWorker";

render(createElement(App), document.getElementById("root"));
unregister();
