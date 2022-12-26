import { FC } from "react";
import { Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { MonsterStatsProps } from "./monster-stats.props";

export const MonsterStats: FC<MonsterStatsProps> = ({ monster }) => {
  if (!monster) return null;
  return (
    <Card my={4}>
      <CardBody>
        {Object.keys(monster.stats).map((_key) => {
          const key = _key as keyof typeof monster.stats;
          return <Text key={key}>{`${monster.stats[key]} ${key}`}</Text>;
        })}
        <Divider my={4} />
        {Object.keys(monster.attributes).map((_key) => {
          const key = _key as keyof typeof monster.attributes;
          return <Text key={key}>{`${monster.attributes[key]} ${key}`}</Text>;
        })}
      </CardBody>
    </Card>
  );
};
