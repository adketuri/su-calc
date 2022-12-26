import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { StatViewProps } from "./stat-view.props";

export const StatView: FC<StatViewProps> = ({ description, value }) => {
  return (
    <>
      <Heading>{value}</Heading>
      <Text fontSize="xs">{description}</Text>
    </>
  );
};
