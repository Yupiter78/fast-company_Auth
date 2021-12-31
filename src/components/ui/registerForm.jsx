import React, { useEffect, useState } from "react";

import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
import { useQualities } from "../../hooks/useQuality";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const validatorConfig = {
    email: {
        isRequired: { message: "Электронная почта обязательна для заполнения" },
        isEmail: { message: "Введите корректный email" }
    },
    name: {
        isRequired: { message: "Имя обязательно для заполнения" },
        min: { message: "Имя должно состоять из 3 и более символов", value: 3 }
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
    },
    profession: {
        isRequired: { message: "Профессию выбрать обязательно" }
    },
    license: {
        isRequired: {
            message:
                "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
        }
    }
};

const RegisterForm = () => {
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState({});

    const { professions, isLoading: professionIsLoading } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const { qualities, isLoading: qualityIsLoading } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const { singUp } = useAuth();
    const isValid = Object.keys(errors).length === 0;

    const history = useHistory();

    useEffect(() => {
        if (!professionIsLoading && !qualityIsLoading) {
            setData({
                email: "",
                password: "",
                profession: "",
                sex: "male",
                name: "",
                qualities: [],
                license: false
            });
        }
    }, [professionIsLoading, qualityIsLoading]);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (field) => {
        setData((prev) => ({
            ...prev,
            [field.name]: field.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await singUp(newData);
            history.push("/");
        } catch (err) {
            setErrors(err);
        }
    };

    if (!data) {
        return <h1>Loading...</h1>;
    }

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
                name="name"
                label="Имя"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                name="password"
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                value={data.profession}
                options={professionsList}
                onChange={handleChange}
                defaultOption="Choose..."
                error={errors.profession}
                label="Выберите профессию"
            />
            <RadioField
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите пол"
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
            />
            <MultiSelectField
                name="qualities"
                options={qualitiesList}
                onChange={handleChange}
                label="Выберите качества"
            />
            <CheckboxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckboxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-outline-primary w-100"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
