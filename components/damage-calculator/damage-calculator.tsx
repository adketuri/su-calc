import { Select } from "@chakra-ui/react";
import { Stats } from "fs";
import { FC, useState } from "react";

import monsters from "../../data/monsters.json";
import { MonsterStats } from "../monster-stats";

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
export type StatKey = keyof typeof Stats;

export const DamageCalculator: FC = () => {
  const [selectedMonster, setSelectedMonster] = useState<undefined | Monster>(
    undefined
  );
  return (
    <>
      <Select
        placeholder="Select option"
        onChange={(e) =>
          setSelectedMonster(
            e.target.value ? monsters[e.target.value as MonsterKey] : undefined
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
    </>
  );
};
