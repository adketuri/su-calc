import { FC, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { PlayerStatsProps } from "./player-stats.props";
import { Attributes, Stats } from "../damage-calculator";
import { StatView } from "../stat-view/stat-view";

const statKeys = ["str", "vit", "int", "dex"];
const attributeKeys = ["atk", "matk", "def", "mdef", "eva", "acc"];

export const calculateHp = (level: number, stats: Stats) => {
  return Math.floor((level / 8) * (stats.vit * 6) + 18);
};

export const toNum = (value: any) => {
  if (typeof value === "number") return value;
  return parseInt(typeof value === "string" ? value : "") || 0;
};

export const calculateDamage = (
  attackerStats: Stats,
  attackerAttributes: Attributes,
  defenderStats: Stats,
  defenderAttributes: Attributes,
  physical: boolean
) => {
  const critMultiplier = 1;
  const elementMultiplier = 1;
  const damage =
    ((((toNum(physical ? attackerAttributes.atk : attackerAttributes.matk) +
      5) /
      7) *
      toNum(physical ? attackerStats.str : attackerStats.int)) /
      3) *
      (critMultiplier * elementMultiplier) +
    1;
  const reduction =
    ((toNum(physical ? defenderStats.int : defenderStats.vit) / 20) *
      toNum(physical ? defenderAttributes.def : defenderAttributes.mdef)) /
    4;
  let result = Math.max(1, damage - reduction);
  return Math.max(1, Math.floor(result));
};

export const calculateDamageRange = (
  attackerStats: Stats,
  attackerAttributes: Attributes,
  defenderStats: Stats,
  defenderAttributes: Attributes,
  physical: boolean
) => {
  const dmg = calculateDamage(
    attackerStats,
    attackerAttributes,
    defenderStats,
    defenderAttributes,
    physical
  );
  return Math.floor(dmg * 0.8) + " - " + Math.floor(dmg * 1.2);
};

export const calculateAccuracy = (
  attackerLevel: number,
  attackerStats: Stats,
  attackerAttributes: Attributes,
  defenderLevel: number,
  defenderStats: Stats,
  defenderAttributes: Attributes
) => {
  const acc: number =
    200 +
    toNum(attackerStats.dex) +
    toNum(attackerAttributes.acc) +
    toNum(attackerLevel);
  const eva =
    100 +
    toNum(defenderStats.dex) +
    toNum(defenderAttributes.eva) * 2 +
    toNum(defenderLevel);
  return Math.min(100, acc - eva);
};

export const PlayerStats: FC<PlayerStatsProps> = ({ monster }) => {
  const [stats, setStats] = useState<Stats>({ str: 1, int: 1, dex: 1, vit: 1 });
  const [attributes, setAttributes] = useState<Attributes>({
    atk: 1,
    matk: 1,
    def: 1,
    mdef: 1,
  });
  const [level, setLevel] = useState("1");
  return (
    <>
      <Card>
        <CardBody>
          <InputGroup>
            <InputLeftAddon children="lvl" flex={1} />
            <Input
              flex={2}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </InputGroup>
          <Divider my={4} />
          {statKeys.map((_key) => {
            const key = _key as keyof typeof stats;
            return (
              <InputGroup>
                <InputLeftAddon children={key} flex={1} />
                <Input
                  flex={2}
                  key={key}
                  value={stats[key]}
                  onChange={(e) =>
                    setStats({ ...stats, [key]: e.target.value })
                  }
                />
              </InputGroup>
            );
          })}
          <Divider my={4} />
          {attributeKeys.map((_key) => {
            const key = _key as keyof typeof attributes;
            return (
              <InputGroup>
                <InputLeftAddon children={key} flex={1} />
                <Input
                  flex={2}
                  key={key}
                  value={attributes[key]}
                  onChange={(e) =>
                    setAttributes({ ...attributes, [key]: e.target.value })
                  }
                />
              </InputGroup>
            );
          })}
          <Divider my={4} />
          <Flex justifyContent="center">
            <Heading>{calculateHp(toNum(level), stats)} hp</Heading>
          </Flex>
        </CardBody>
      </Card>
      <Card mt={4}>
        <CardBody>
          {monster && (
            <>
              <StatView
                description="Player damage to enemy (physical)"
                value={calculateDamageRange(
                  stats,
                  attributes,
                  monster.stats,
                  monster.attributes,
                  true
                )}
              />
              <StatView
                description="Player damage to enemy (magical)"
                value={calculateDamageRange(
                  stats,
                  attributes,
                  monster.stats,
                  monster.attributes,
                  false
                )}
              />
              <StatView
                description="Player accuracy"
                value={
                  calculateAccuracy(
                    toNum(level),
                    stats,
                    attributes,
                    monster.level,
                    monster.stats,
                    monster.attributes
                  ) + "%"
                }
              />
              <StatView
                description="Player physical hits to kill enemy"
                value={
                  "~" +
                  Math.ceil(
                    calculateHp(monster.level, monster.stats) /
                      calculateDamage(
                        stats,
                        attributes,
                        monster.stats,
                        monster.attributes,
                        true
                      ) /
                      (calculateAccuracy(
                        toNum(level),
                        stats,
                        attributes,
                        monster.level,
                        monster.stats,
                        monster.attributes
                      ) /
                        100)
                  )
                }
              />
              <StatView
                description="Player magical hits to kill enemy"
                value={
                  "~" +
                  Math.ceil(
                    calculateHp(monster.level, monster.stats) /
                      calculateDamage(
                        stats,
                        attributes,
                        monster.stats,
                        monster.attributes,
                        false
                      ) /
                      (calculateAccuracy(
                        toNum(level),
                        stats,
                        attributes,
                        monster.level,
                        monster.stats,
                        monster.attributes
                      ) /
                        100)
                  )
                }
              />
              <Divider my={4} />
              <StatView
                description="Enemy damage to player (physical)"
                value={calculateDamageRange(
                  monster.stats,
                  monster.attributes,
                  stats,
                  attributes,
                  true
                )}
              />
              <StatView
                description="Enemy damage to player (magical)"
                value={calculateDamageRange(
                  monster.stats,
                  monster.attributes,
                  stats,
                  attributes,
                  false
                )}
              />
              <StatView
                description="Enemy accuracy"
                value={
                  calculateAccuracy(
                    monster.level,
                    monster.stats,
                    monster.attributes,
                    toNum(level),
                    stats,
                    attributes
                  ) + "%"
                }
              />
              <StatView
                description="Enemy physical hits to kill player"
                value={
                  "~" +
                  Math.ceil(
                    calculateHp(toNum(level), stats) /
                      calculateDamage(
                        monster.stats,
                        monster.attributes,
                        stats,
                        attributes,
                        true
                      ) /
                      (calculateAccuracy(
                        monster.level,
                        monster.stats,
                        monster.attributes,
                        toNum(level),
                        stats,
                        attributes
                      ) /
                        100)
                  )
                }
              />
              <StatView
                description="Enemy magical hits to kill player"
                value={
                  "~" +
                  Math.ceil(
                    calculateHp(toNum(level), stats) /
                      calculateDamage(
                        monster.stats,
                        monster.attributes,
                        stats,
                        attributes,
                        false
                      ) /
                      (calculateAccuracy(
                        monster.level,
                        monster.stats,
                        monster.attributes,
                        toNum(level),
                        stats,
                        attributes
                      ) /
                        100)
                  )
                }
              />
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};
