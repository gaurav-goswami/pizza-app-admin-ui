import { MESSAGES } from "./constants";
import { notification } from "antd";

export const throwErrorMessage = ({
  err,
  defaultMessage = MESSAGES.errors.defaultMessage,
}: {
  err: any;
  defaultMessage?: string;
}) => {
  const { data } = err.response;
  const message = data?.errors[0].message || defaultMessage;
  return notification.error({
    type: "error",
    message,
    placement: 'top'
  });
};
