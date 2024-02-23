import React from "react";
import { Stack, TextField } from "@mui/material";
import InputError from "../InputError";

const Message = ({ formik, loggedIn }) => {
  return (
    <Stack spacing={1} mt={3}>
      <TextField
        label="Message*"
        multiline
        rows={2}
        name="message"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={!loggedIn}
        // size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.message &&
              formik.errors.message &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.message && formik.errors.message && (
        <InputError error={formik.errors.message} />
      )}
    </Stack>
  );
};

export default Message;
