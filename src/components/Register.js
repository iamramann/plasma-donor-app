// import { Field, Formik, Form, useFormik } from "formik";
// import * as Yup from "yup";
// import { ErrorMessage, useField } from "formik";
// import TextField from "./TextField.jsx";
// export default function Register() {
//   return (
//     <>
//       <Formik
//         initialValues={{ firstName: "" }}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//         validateSchema={Yup.object({
//           firstName: Yup.string().min(3, "Too Short!"),
//         })}
//       >
//         {() => (
//           <Form>
//             <TextField
//               name="firstName"
//               type="text"
//               id="firstName"
//               placeholder="welcome to goa"
//               required={true}
//             />
//             <TextField type="submit" />
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// }
