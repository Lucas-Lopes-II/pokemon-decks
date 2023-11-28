export const confirmMessage = (
  msg: string,
  callbackOk: () => void,
  callbackCancel: () => void,
) => {
  const resultado = confirm(msg);

  if (resultado) {
    callbackOk();
  } else {
    callbackCancel();
  }
};
