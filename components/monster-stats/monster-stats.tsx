import { FC, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MonsterStatsProps } from "./monster-stats.props";
import { calculateHp, toNum } from "../player-stats";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

// TODO stats and attributes have some duplication here
export const MonsterStats: FC<MonsterStatsProps> = ({ monster }) => {
  if (!monster) return null;
  const { stats, attributes, level, setStats, setAttributes, setLevel } =
    monster;
  return (
    <Card my={4}>
      <CardBody>
        {Object.keys(stats).map((_key) => {
          const key = _key as keyof typeof stats;
          return (
            <Flex direction="row" align="center" justify="space-between">
              <IconButton
                size="sm"
                aria-label="-"
                colorScheme="red"
                icon={<MinusIcon />}
                onClick={() => setStats({ ...stats, [key]: stats[key] - 1 })}
              />
              <Heading key={key}>{`${stats[key]} ${key}`}</Heading>
              <IconButton
                size="sm"
                aria-label="+"
                colorScheme="blue"
                icon={<AddIcon />}
                onClick={() => setStats({ ...stats, [key]: stats[key] + 1 })}
              />
            </Flex>
          );
        })}
        <Divider my={4} />
        {Object.keys(attributes).map((_key) => {
          const key = _key as keyof typeof attributes;
          return (
            <Flex direction="row" align="center" justify="space-between">
              <IconButton
                size="sm"
                aria-label="-"
                colorScheme="red"
                icon={<MinusIcon />}
                onClick={() =>
                  setAttributes({
                    ...attributes,
                    [key]: toNum(attributes[key]) - 1,
                  })
                }
              />
              <Heading key={key}>{`${attributes[key]} ${key}`}</Heading>
              <IconButton
                size="sm"
                aria-label="+"
                colorScheme="blue"
                icon={<AddIcon />}
                onClick={() =>
                  setAttributes({
                    ...attributes,
                    [key]: toNum(attributes[key]) + 1,
                  })
                }
              />
            </Flex>
          );
        })}
        <Divider my={4} />
        <Flex justifyContent="center">
          <Heading>{calculateHp(level, stats)} hp</Heading>
        </Flex>
      </CardBody>
    </Card>
  );
};
