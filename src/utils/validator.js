export function validator(data, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        switch (validateMethod) {
            case "isRequired":
                if (typeof data === "boolean") {
                    if (!data) return config.message;
                } else if (typeof data === "object") {
                    if (Object.keys(data).length === 0) return config.message;
                } else {
                    if (data.trim() === "") return config.message;
                }
                break;
            case "isEmail":
                // eslint-disable-next-line no-case-declarations
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                if (!emailRegExp.test(data)) return config.message;
                break;
            case "hasCapital":
                // eslint-disable-next-line no-case-declarations
                const capitalRegExp = /[A-Z]+/g;
                if (!capitalRegExp.test(data)) return config.message;
                break;
            case "hasNumber":
                // eslint-disable-next-line no-case-declarations
                const numberRegExp = /\d+/g;
                if (!numberRegExp.test(data)) return config.message;
                break;
            case "min":
                if (data.length < config.value) return config.message;
                break;
        }
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
