import { Box, Flex, Select } from "@chakra-ui/react";
import { FC, useState } from "react";

import monsters from "../../data/monsters.json";
import { MonsterStats } from "../monster-stats";
import { PlayerStats } from "../player-stats";

export interface Stats {
  str: number;
  dex: number;
  vit: number;
  int: number;
}

export interface Attributes {
  atk?: number;
  matk?: number;
  def?: number;
  mdef?: number;
}

export interface Monster {
  level: number;
  exp?: number;
  stats: Stats;
  attributes: Attributes;
}

export type MonsterKey = keyof typeof monsters;
export type StatKey = keyof Stats;

export const DamageCalculator: FC = () => {
  const [selectedMonster, setSelectedMonster] = useState<undefined | Monster>(
    undefined
  );
  return (
    <>
      <Flex direction="row" gap={4}>
        <Box flex={1}>
          <PlayerStats monster={selectedMonster} />
        </Box>
        <Box flex={1}>
          <Select
            placeholder="Select option"
            onChange={(e) =>
              setSelectedMonster(
                e.target.value
                  ? monsters[e.target.value as MonsterKey]
                  : undefined
              )
            }
          >
            {Object.keys(monsters).map((key) => {
              const monster: Monster = monsters[key as MonsterKey];
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            })}
          </Select>
          <MonsterStats monster={selectedMonster} />
        </Box>
      </Flex>
    </>
  );
};
