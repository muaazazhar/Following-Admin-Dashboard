import React from "react";
import {
  CardContainer,
  CardHeader,
  BtnContainer,
  InfoContainer,
  Info,
  Heading,
  Divider,
  TextBox,
  InviteContainer,
  CardFooter,
  MobileBtnContainer,
  MobileBtn,
} from "./styles";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import BackButton from "../../Buttons/BackButton";
import DeleteButton from "../../Buttons/DeleteButton";
import Invitations from "../../Invitations";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../../../utils/API";
import axios from "axios";
import ExportButton from "../../Buttons/ExportButton";
import VerifyButton from "../../Buttons/VerifyButton";

export default function UserDetailsComponent({ data }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const deleteUser = (email) => {
    axios
      .put(
        DELETE_USER,
        { email: email },
        {
          headers: { token: token },
        }
      )
      .then(function (res) {
        navigate("/users");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <CardContainer>
      <CardHeader>
        <BackButton />
        <BtnContainer>
          <ExportButton userData={data} single={true} />
          <DeleteButton onClick={() => deleteUser(data?.email)} />
        </BtnContainer>
        <MobileBtnContainer>
          <ExportButton mobileView={true} userData={data} single={true}>
            <ExportOutlined />
          </ExportButton>
          <MobileBtn color={"#e94e51"} onClick={() => deleteUser(data?.email)}>
            <DeleteOutlined />
          </MobileBtn>
        </MobileBtnContainer>
      </CardHeader>
      <>
        <Divider>
          <InfoContainer>
            <Info>
              <TextBox>
                Name: <strong>{data?.name}</strong>
              </TextBox>
              <TextBox>
                Phone: <strong>{data?.phoneNumber}</strong>
              </TextBox>
            </Info>
            <Info>
              <TextBox>
                Email: <strong>{data?.email}</strong>
              </TextBox>
              <TextBox>
                Licenced: <strong>{data?.isLicensed ? "Yes" : "No"}</strong>
              </TextBox>
            </Info>
          </InfoContainer>
          <Heading>Social Accounts</Heading>
        </Divider>
        <Divider>
          <InfoContainer>
            <Info>
              <TextBox>
                SnapChat: <strong>{data?.snapchat || " - -"}</strong>
              </TextBox>
              <TextBox>
                Instagram: <strong>{data?.instagram || " - -"}</strong>
              </TextBox>
              <TextBox>
                Tiktok: <strong>{data?.tiktok || " - -"}</strong>
              </TextBox>
            </Info>
          </InfoContainer>
          <Heading>Referal Progress</Heading>
        </Divider>
        <Divider>
          <InviteContainer>
            <Invitations
              text={"Accepted Invitations"}
              number={data?.referralCount}
              status={"accepted"}
            />
          </InviteContainer>
        </Divider>
      </>
      <CardFooter>
        <VerifyButton state={data?.isApproved} email={data?.email} />
      </CardFooter>
    </CardContainer>
  );
}
