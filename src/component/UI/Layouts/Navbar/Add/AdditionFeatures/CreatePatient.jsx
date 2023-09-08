import { Modal } from "antd";
import { useState } from "react";

const CreatePatient = ({ handleClose, patientClicked }) => {
  const { token } = useToken();
  const [active, setActive] = useState(false);
  const [phone, setPhone] = useState();
  console.log(patientClicked);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    const payload = {
      client_first_name: data?.client_first_name,
      client_last_name: data?.client_last_name,
      client_dob: data?.client_dob,
      client_gender: data?.client_gender,
      location: data?.pos,
      email: data?.email,
      email_type: data?.email_type,
      email_reminder: Number(data?.email_reminder),
      phone_number: `+${data?.phone}`,
      phone_type: data?.phone_type,
      is_send_sms: Number(data?.is_send_sms),
    };
    const CreatePatientApi = await PostfetchData({
      endPoint: "admin/ac/patient/create",
      payload: payload,
      token,
    });
    console.log("add data ", CreatePatientApi);
    if (CreatePatientApi.status === "success") {
      toast.success("Created Successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      handleClose();
    } else {
      toast.error("Put Valid Information", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };
  return (
    <div>
      <Modal
        open={patientClicked} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={600}
        closable={false}
        className="box rounded-xl "
      >
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-left text-orange-400">
              Create Patient
            </h1>
          </div>
        </div>
      </Modal>
      <hr />
    </div>
  );
};

export default CreatePatient;
