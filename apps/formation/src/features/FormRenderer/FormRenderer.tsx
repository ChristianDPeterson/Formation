import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormElement } from '../FormBuilder/FormElement';

type FormRendererProps = {
    formElements: FormElement[];
};

export function FormRenderer({ formElements }: FormRendererProps) {
    const getInitialValues = (formElements: FormElement[]) => {
        const sum: {
            [key: string]: string;
        } = {};
        formElements.forEach(el => {
            sum[el.fieldName] = el.initialValue ?? '';
        });
        console.log({ formElements, sum });
        return sum;
    };

    return (
        <div>
            <h1>Any place in your app!</h1>
            <Formik
                initialValues={getInitialValues(formElements)}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {formElements &&
                            formElements.map(field => (
                                <>
                                    <label htmlFor={field?.fieldName}>
                                        {field?.fieldLabel}
                                    </label>
                                    <Field
                                        id={field?.fieldName}
                                        type={field?.fieldType}
                                        name={field?.fieldName}
                                    />
                                    {/* <ErrorMessage
                                        name={field?.name}
                                        component="div"
                                    /> */}
                                </>
                            ))}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
