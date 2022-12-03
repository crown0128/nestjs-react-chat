import { FC } from "react";
import { AvatarGroup } from "@mui/material";

import { IUser } from "../../../models/IUser";

interface RoomMembersProps {
  members: IUser[];
}

const RoomMembers: FC<RoomMembersProps> = ({ members }) => {
  return <AvatarGroup>RoomMembers</AvatarGroup>;
};

export default RoomMembers;
