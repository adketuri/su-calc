import { FC, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { PlayerStatsProps } from "./player-stats.props";
import { Attributes, Stats } from "../damage-calculator";
import { StatView } from "../stat-view/stat-view";

const statKeys = ["str", "vit", "int", "dex"];
const attributeKeys = ["atk", "matk", "def", "mdef"];

const calculateDamage = (
  attackerStats: Stats,
  attackerAttributes: Attributes,
  defenderStats: Stats,
  defenderAttributes: Attributes
) => {
  const critMultiplier = 1;
  const elementMultiplier = 1;
  const atk = attackerAttributes.atk || 0;
  const damage =
    ((((atk + 5) / 7) * attackerStats.str) / 3) *
      (critMultiplier * elementMultiplier) +
    1;
  const reduction =
    ((defenderStats.vit / 20) * (defenderAttributes.def || 0)) / 4;
  let result = Math.max(1, damage - reduction);

  return (
    Math.max(1, Math.floor(result * 0.8)) + " - " + Math.floor(result * 1.2)
  );
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
        </CardBody>
      </Card>
      <Card mt={4}>
        <CardBody>
          {monster && (
            <StatView
              description="Player damage to enemy (physical)"
              value={calculateDamage(
                stats,
                attributes,
                monster.stats,
                monster.attributes
              )}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};
