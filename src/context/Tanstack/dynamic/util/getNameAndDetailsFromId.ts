export const getNameAndDetailsFromId = <
  Response extends { name?: string; title?: string },
>(
  dataFromId?: Response,
) => {
  const { name, title, ...details } = dataFromId ?? ({} as Response);

  return { name: name ?? title, details };
};
