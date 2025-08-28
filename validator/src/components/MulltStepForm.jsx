import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const initialValues = {
    name: "",
    email: "",
    city: "",
    zip: "",
    username: "",
    password: "",
  };

  const validationSchema = [
    Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    Yup.object({
      city: Yup.string().required("City is required"),
      zip: Yup.string()
        .matches(/^[0-9]{5}$/, "Zip must be 5 digits")
        .required("Zip code is required"),
    }),
    Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  ];

  const handleNext = (values, actions) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("🎉 Form Submitted!\n\n" + JSON.stringify(values, null, 2));
      actions.resetForm();
      setStep(1);
    }
  };

  const handleBack = () => setStep(step - 1);

  // Progress percentage
  const progress = (step / 3) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Step {step} of 3
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[step - 1]}
          onSubmit={handleNext}
        >
          {() => (
            <Form className="space-y-5">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <Field
                      name="city"
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                    <Field
                      name="zip"
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="zip"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {step === 3 ? "Submit" : "Next"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultiStepForm;
