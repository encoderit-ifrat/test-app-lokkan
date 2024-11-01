const triggerValidation = async (values, validatorFn) => {
  // return Cookie.get(cookieName)
  try {
    const data = await Promise.all(
      values.map(async (field) => {
        try {
          const response = await validatorFn(field);
          return response;
        } catch (error) {
          console.error(error);
          return false;
        }
      })
    );
    const allTrue = data.every((result) => result === true);
    console.log("🟥 ~ triggerValidation ~ allTrue:", allTrue);
    return allTrue;
  } catch (error) {
    console.error("Error in triggerValidation:", error);
    return false;
  }
};

export default triggerValidation;
