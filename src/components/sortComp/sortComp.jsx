import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import "./sortComp.css";

export default function SortComp({ setArrOfTags, todoList, setSortParam }) {
  const [options, setOptions] = useState(null);

  let first = true;
  let arr = [];

  useEffect(() => {
    for (const item of todoList) {
      if (first) {
        first = false; //eslint-disable-line
      }
      if (!arr.includes(item.hashtag)) {
        arr.push(item.hashtag);
      }
    }
    setArrOfTags(arr);

    setOptions(
      arr.map((item) => {
        return item === "" ? (
          <option value={item} key={nanoid()}>
            Without hashtag
          </option>
        ) : (
          <option value={item} key={nanoid()}>
            {item}
          </option>
        );
      })
    );
    arr = []; //eslint-disable-line
  }, [todoList]); //eslint-disable-line

  function handleChangeRadio(value) {
    setSortParam(value);
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup id="sortWrapper" row name="row-radio-buttons-group">
        <FormControlLabel
          onChange={(e) => {
            handleChangeRadio(e.target.value);
          }}
          value="ALL"
          control={<Radio color="success" />}
          label={<Typography variant="h5">ALL</Typography>}
        />
        <FormControlLabel
          onChange={(e) => {
            handleChangeRadio(e.target.value);
          }}
          value="Done"
          control={<Radio color="success" />}
          label={<Typography variant="h5">Done</Typography>}
        />
        <FormControlLabel
          onChange={(e) => {
            handleChangeRadio(e.target.value);
          }}
          value="Not done"
          control={<Radio color="success" />}
          label={<Typography variant="h5">Not done</Typography>}
        />

        {options && (
          <select
            style={{ cursor: "pointer" }}
            onChange={(e) => {
              handleChangeRadio(e.target.value);
            }}
          >
            {options}
          </select>
        )}
      </RadioGroup>
    </FormControl>
  );
}
