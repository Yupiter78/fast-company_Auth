import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useComments } from "../../../hooks/useComments";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";

const validatorConfig = {
    content: {
        isRequired: { message: "Сообщение не может быть пустым" }
    }
};

const CommentForm = () => {
    const [data, setData] = useState({ content: "" });
    const [errors, setErrors] = useState({});
    const { createComment } = useComments();

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (field) => {
        setData((prev) => ({
            ...prev,
            [field.name]: field.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        createComment(data);
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="card mb-2">
            <div className="card-body">
                <h2>New comment</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            name="content"
                            label="Сообщение"
                            value={data.content}
                            onChange={handleChange}
                            error={errors.content}
                        />
                    </div>

                    <div className="text-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isValid}
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    userId: PropTypes.string,
    renderComments: PropTypes.func
};

export default CommentForm;
