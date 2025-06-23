import { useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Switch,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

import { CONSTANTS } from "../../utils/constants";

import {
  checkIfActivityHasStarted,
  getFromLocal,
  removeFromLocal,
  saveToLocal,
  sendIncidentMessage,
} from "../../utils/telegramSender";

import "./SFTForm.css";

const SFTForm = () => {
  const [form] = Form.useForm();

  const [isActivityStarted, setIsActivityStarted] = useState(
    checkIfActivityHasStarted()
  );
  const [isSending, setIsSending] = useState(false);

  /** Form handlers. */
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // console.log("Date: ", values["date"].format("DDMMYY"));
    // console.log("Time: ", values["time"].format("HHmm"));
    setIsSending(true);
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT,
      values.natureOfIncident
    );
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.DATE, values["date"].format("DDMMYY"));
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.TIME, values["time"].format("HHmm"));
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.NAME, values.name.toUpperCase());
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.NRIC, values.nric.toUpperCase());
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION, values.location);
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION, values.description);
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES, values.updates);
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED, values.nokInformed);
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.POC_NAME,
      values.pocName.toUpperCase()
    );
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER, values.pocNumber);

    if (values["timeExcoOs"]) {
      saveToLocal(
        CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS,
        values["timeExcoOs"].format("HHmm")
      );
    }
    if (values["timeGsoc"]) {
      saveToLocal(
        CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC,
        values["timeGsoc"].format("HHmm")
      );
    }
    if (values.caseNumber) {
      saveToLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER, values.caseNumber);
    }
    if (values.actionByOs) {
      saveToLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS, values.actionByOs);
    }

    await sendIncidentMessage();
    setIsActivityStarted(true);
    setIsSending(false);
  };

  const updateIR = async () => {
    setIsSending(true);
    await sendIncidentMessage();
    setIsSending(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishActivity = async () => {
    // console.log("End activity");
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.NAME);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.NRIC);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NAME);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER);
    removeFromLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS);
    form.resetFields();
    setIsActivityStarted(false);
  };

  const onNameChange = (event) => {
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.NAME,
      event.target.value.toUpperCase()
    );
  };

  const onNricChange = (event) => {
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.NRIC,
      event.target.value.toUpperCase()
    );
  };

  const onLocationChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION, event.target.value);
  };

  const onDescriptionChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION, event.target.value);
  };

  const onUpdateChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES, event.target.value);
  };

  const onNatureChange = (event) => {
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT,
      event.target.value
    );
  };

  const onPocNameChange = (event) => {
    saveToLocal(
      CONSTANTS.FORM_ITEM_KEYS.POC_NAME,
      event.target.value.toUpperCase()
    );
  };

  const onPocNumberChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER, event.target.value);
  };

  const onNokInformedChange = (checked) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED, checked);
  };

  const onDateChange = (date, dateString) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.DATE, date.format("DDMMYY"));
  };

  const onTimeChange = (time, timeString) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.TIME, time.format("HHmm"));
  };

  const onTimeExcoOsChange = (time, timeString) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS, time.format("HHmm"));
  };

  const onTimeGsocChange = (time, timeString) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC, time.format("HHmm"));
  };

  const onCaseNumberChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER, event.target.value);
  };

  const onActionByOsChange = (event) => {
    saveToLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS, event.target.value);
  };

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="SFTForm"
    >
      <Form.Item
        label="NATURE OF INCIDENT"
        name="natureOfIncident"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NATURE_OF_INCIDENT)
              : ""
          }
          onChange={onNatureChange}
        />
      </Form.Item>

      <Form.Item
        label="DATE OF INCIDENT:"
        name="date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          defaultValue={
            isActivityStarted
              ? dayjs(getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DATE), "DDMMYY")
              : ""
          }
          allowClear={false}
          onChange={onDateChange}
        />
      </Form.Item>

      <Form.Item
        label="TIME OF INCIDENT:"
        name="time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker
          format={"HH:mm"}
          defaultValue={
            isActivityStarted
              ? dayjs(getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME), "HHmm")
              : ""
          }
          allowClear={false}
          onChange={onTimeChange}
        />
      </Form.Item>

      <Form.Item
        label="RANK AND NAME"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NAME) : ""
          }
          onChange={onNameChange}
        />
      </Form.Item>

      <Form.Item
        label="NRIC"
        name="nric"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NRIC) : ""
          }
          onChange={onNricChange}
        />
      </Form.Item>

      <Form.Item
        label="LOCATION OF INCIDENT"
        name="location"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.LOCATION)
              : ""
          }
          onChange={onLocationChange}
        />
      </Form.Item>

      <Form.Item
        label="BRIEF DESCRIPTION"
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.DESCRIPTION)
              : ""
          }
          rows={3}
          onChange={onDescriptionChange}
        />
      </Form.Item>

      <Form.Item
        label="UPDATES"
        name="updates"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.UPDATES)
              : ""
          }
          placeholder="e.g. CAA 140625 @0700H, LCP XXXX was evacuated by SCDF ambulance, he is accompanied by 3SG YYYY."
          rows={6}
          onChange={onUpdateChange}
        />
      </Form.Item>

      <Form.Item label="NOK INFORMED" name="nokInformed">
        <Switch
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.NOK_INFORMED) === "true"
                ? true
                : false
              : false
          }
          onChange={onNokInformedChange}
        />
      </Form.Item>

      <Form.Item
        label="RANK AND NAME OF POC"
        name="pocName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NAME)
              : ""
          }
          onChange={onPocNameChange}
        />
      </Form.Item>

      <Form.Item
        label="PHONE NUMBER OF POC"
        name="pocNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          defaultValue={
            isActivityStarted
              ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.POC_NUMBER)
              : ""
          }
          onChange={onPocNumberChange}
        />
      </Form.Item>
      {isActivityStarted && (
        <Form.Item
          label="TIME EXCO OS INFORMED"
          name="timeExcoOs"
          help="Only fill in this field when instructed by the L2 Safety"
        >
          <TimePicker
            format={"HH:mm"}
            disabled={!isActivityStarted}
            defaultValue={
              getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS) !== null
                ? dayjs(
                    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_EXCO_OS),
                    "HHmm"
                  )
                : ""
            }
            allowClear={false}
            onChange={onTimeExcoOsChange}
          />
        </Form.Item>
      )}
      {isActivityStarted && (
        <Form.Item
          label="TIME GSOC INFORMED"
          name="timeGsoc"
          help="Only fill in this field when instructed by the L2 Safety"
        >
          <TimePicker
            format={"HH:mm"}
            disabled={!isActivityStarted}
            defaultValue={
              getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC) !== null
                ? dayjs(
                    getFromLocal(CONSTANTS.FORM_ITEM_KEYS.TIME_GSOC),
                    "HHmm"
                  )
                : ""
            }
            allowClear={false}
            onChange={onTimeGsocChange}
          />
        </Form.Item>
      )}
      {isActivityStarted && (
        <Form.Item
          label="CASE NUMBER"
          name="caseNumber"
          help="Only fill in this field when instructed by the L2 Safety"
        >
          <Input
            defaultValue={
              getFromLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER) !== null
                ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.CASE_NUMBER)
                : ""
            }
            maxLength={2}
            disabled={!isActivityStarted}
            onChange={onCaseNumberChange}
          />
        </Form.Item>
      )}
      {isActivityStarted && (
        <Form.Item
          label="ACTION REQUIRED BY OS OFFICE"
          name="actionByOs"
          help="Only fill in this field when instructed by the L2 Safety"
        >
          <Input.TextArea
            defaultValue={
              getFromLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS) !== null
                ? getFromLocal(CONSTANTS.FORM_ITEM_KEYS.ACTION_BY_OS)
                : ""
            }
            disabled={!isActivityStarted}
            onChange={onActionByOsChange}
          />
        </Form.Item>
      )}
      {!isActivityStarted && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            color="green"
            loading={isSending}
          >
            Submit Incident Report
          </Button>
        </Form.Item>
      )}
      {isActivityStarted && (
        <Form.Item>
          <Button type="primary" onClick={updateIR} loading={isSending}>
            Update Incident Report
          </Button>
        </Form.Item>
      )}
      {isActivityStarted && (
        <Form.Item>
          <Popconfirm
            title="Close Incident Report"
            description="Are you sure to close this incident report?"
            onConfirm={onFinishActivity}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Close Incident Report
            </Button>
          </Popconfirm>
        </Form.Item>
      )}
    </Form>
  );
};

export default SFTForm;
