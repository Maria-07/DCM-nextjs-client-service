import { useState } from "react";
import CreateAppointmentAvailability from "./CreateAppointmentAvailability/CreateAppointmentAvailability";
import { Modal } from "antd";

const CreateAppointment = ({ handleClose, clicked }) => {
  // console.log(handleClose, clicked);
  const [billable, setBillable] = useState(true);
  const [recurrence, setRecurrence] = useState(false);
  const [daily, setDaily] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();
  const [clientId, setClientId] = useState(0);
  const [authId, setAuthId] = useState(0);
  const [fromtime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const { token } = useToken();
  // For Non-billable appointment create=>provider select
  const [seletedProvider, setSelectedProvider] = useState([]);
  console.log("Billable", billable);

  // Appointment Availability
  const [availability, setAvailability] = useState(false);
  const availabilityHandler = () => {
    setAvailability(true);
  };
  const availabilityHandleClose = () => {
    setAvailability(false);
  };

  //Appointment Get Patient Name Api
  const { data: patientsName, isLoading: patientsNameLoading } =
    useGetAppointmentPatientNameQuery(token);

  //Appointment Get Provider Name Api
  const { data: providersName, isLoading: providersNameLoading } =
    useGetAppointmentProviderNameQuery(token);

  //Appointment Get Patient Authorization/auth
  const [
    getAppointmentPatientAuth,
    {
      data: patientAuthData,
      isLoading: patientAuthLoading,
      isError: patientAuthError,
    },
  ] = useGetAppointmentPatientAuthMutation();

  console.log("loaidng feature", patientsNameLoading, patientAuthLoading);

  //Appointment Get Patient Authorization Activity/Service Api
  const [
    getAppointmentAuthorizationActivity,
    {
      data: authorizationActivityData,
      isLoading: authorizationActivityLoading,
      isError: authorizationActivityError,
    },
  ] = useGetAppointmentAuthorizationActivityMutation();

  //Appointment Get POS
  const { data: posData, isLoading: isPosLoading } =
    useGetAppointmentPOSQuery(token);

  console.log("pos data", posData);

  //Appointment Create New Session API
  const [
    appointmentCreate,
    { data: creationData, isSuccess: createSuccess, isError: createError },
  ] = useAppointmentCreateMutation();

  console.log("Creating appointment", creationData);

  useEffect(() => {
    getAppointmentPatientAuth({
      token,
      payload: {
        client_id: clientId,
      },
    });
  }, [clientId, token, getAppointmentPatientAuth]);
  useEffect(() => {
    getAppointmentAuthorizationActivity({
      token,
      payload: {
        auth_id: authId,
      },
    });
  }, [authId, token, getAppointmentAuthorizationActivity]);

  const from_Time = (time, timeString) => {
    console.log("From-Time", timeString);
    setFromTime(timeString);
  };

  const to_Time = (time, timeString) => {
    console.log("To-Time", timeString);
    setToTime(timeString);
  };
  console.log("after selecting time", fromtime, toTime);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // // testing single calendar
  // const [date, setDate] = useState(new Date());
  // const [openCalendar, setOpenCalendar] = useState(false);
  // const changeDate = (date) => {
  //   setDate(date);
  // };
  // console.log(date);

  // const month = date ? date.getMonth() + 1 : null;
  // const day = date ? date.getDate() : null;
  // const year = date ? date.getFullYear() : null;

  // const handleCancelDate = () => {
  //   // setOpenCalendar(false);
  //   setDate(null);
  // };
  const month = date ? date.toLocaleString("en-us", { month: "long" }) : null;
  const currentDate = date ? date.getDate() : null;
  const year = date ? date.getFullYear() : null;

  const handleClearDate = () => {
    setOpen(false);
    setDate(null);
  };
  const handleCancelDate = () => {
    setOpen(false);
    setDate(new Date());
  };

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        check_date: date ? date.toLocaleDateString() : null,
      });
    }, 0);
    // }, [date.toLocaleDateString()]);
  }, [date, reset]);

  const onSubmit = (data) => {
    if (billable) {
      const payload = {
        billable: BoolConverter(billable),
        ...data,
        form_time_session: fromtime,
        to_time_session: toTime,
      };
      if (payload) {
        appointmentCreate({
          token,
          payload,
        });
      }
      console.log("for billable payload", payload);
    } else {
      const payload = {
        billable: BoolConverter(billable),
        ...data,
        client_id: 1,
        authorization_id: 1,
        provider_mul_id: seletedProvider,
        form_time_session: fromtime,
        to_time_session: toTime,
      };
      if (seletedProvider?.length > 0) {
        appointmentCreate({
          token,
          payload,
        });
      }
      console.log("for Non-billable payload", payload);
    }
    // reset();
  };
  // To Show Success Or Error Message
  useEffect(() => {
    if (creationData?.status === "success") {
      toast.success(<h1>Successfully Appoinment Created</h1>, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      handleClose();
    } else if (creationData?.status === "error") {
      toast.error(<h1 className="text-center">{creationData?.message}</h1>, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }, [creationData?.status]);

  return (
    <div>
      <Modal
        open={clicked} //aikhaney true na likey ekta state ana lagbey tar value 'true'
        centered
        footer={null}
        bodyStyle={{ padding: "0" }}
        width={525}
        closable={false}
        className="box rounded-xl"
        // onClose={handleClose}
        // aria-labelledby="responsive-dialog-title"
      >
        <div>jijijiojiji</div>
      </Modal>
      {availability && (
        <CreateAppointmentAvailability
          handleClose={availabilityHandleClose}
          open={availability}
        ></CreateAppointmentAvailability>
      )}
    </div>
  );
};

export default CreateAppointment;
