import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import CheckboxField from "../../common/form/checkboxField";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQuality";

const validatorConfig = {
    name: {
        isRequired: { message: "Имя обязательно для заполнения" }
    },
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

const EditUserPage = () => {
    const { userId } = useParams();
    const { currentUser, update } = useAuth();

    const { professions, isLoading: professionIsLoading } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const {
        qualities,
        isLoading: qualityIsLoading,
        getQuality
    } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const [data, setData] = useState({
        ...currentUser,
        password: "",
        qualities: fillQualities(currentUser.qualities)
    });
    console.log("data_start:", data);
    const [errors, setErrors] = useState({});

    const history = useHistory();

    if (userId !== currentUser._id) {
        history.push(`/users/${currentUser._id}/edit`);
    }

    useEffect(() => {
        if (!professionIsLoading && !qualityIsLoading) {
            fillData(currentUser);
        }
    }, [professionIsLoading, qualityIsLoading]);

    useEffect(() => {
        validate();
    }, [data]);

    function fillQualities(qualitiesId) {
        const qualities = qualitiesId.map((q) => getQuality(q));
        return qualities.map((q) => ({ label: q.name, value: q._id }));
    }

    const fillData = (user) => {
        const newData = {
            ...data,
            qualities: fillQualities(user.qualities)
        };
        setData(newData);
    };

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

        const qualities = data.qualities.map((q) => q.value);
        const newData = {
            ...data,
            qualities
        };

        delete newData.email;
        delete newData.password;

        try {
            await update(data.email, data.password, newData);
            history.push(`/users/${userId}`);
        } catch (err) {
            setErrors(err);
        }
    };

    const goBack = () => {
        history.push(`/users/${userId}`);
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={goBack}>
                <i className="bi bi-caret-left" />
                Назад
            </button>

            <div className="offset-md-3 col-md-6 shadow p-3">
                {!data ? (
                    <h1>Loading...</h1>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Имя"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
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
                            value={data.qualities}
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
                )}
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
