import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckboxField from "../common/form/checkboxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const validatorConfig = {
    email: {
        isRequired: { message: "Электронная почта обязательна для заполнения" },
        isEmail: { message: "Введите корректный email" }
    },
    password: {
        isRequired: { message: "Пароль обязателен для заполнения" },
        hasCapital: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        hasNumber: { message: "Пароль должен содержать хотя бы одну цифру" },
        min: {
            message: "Пароль должен состоять из 8 и более символов",
            value: 8
        }
    }
};

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const { logIn } = useAuth();
    const isValid = Object.keys(errors).length === 0;

    const history = useHistory();

    const handleChange = (field) => {
        setData((prev) => ({
            ...prev,
            [field.name]: field.value
        }));
        setEnterError(null);
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        try {
            await logIn(data);
            history.push(history.location.state?.from?.pathname ?? "/");
        } catch (err) {
            setEnterError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="email"
                label="Электронная почта"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                name="password"
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckboxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckboxField>

            {enterError && <p className="text-danger">{enterError}</p>}

            <button
                type="submit"
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
