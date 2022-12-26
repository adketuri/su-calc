import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Monster, Stats, Attributes } from "../components/damage-calculator"

export interface MonsterConfig {
    stats: Stats
    attributes: Attributes;
    level: number;
    setStats: Dispatch<SetStateAction<Stats>>
    setAttributes: Dispatch<SetStateAction<Attributes>>
    setLevel: Dispatch<SetStateAction<number>>
}

export const useMonsterConfig: (monster?: Monster) => MonsterConfig = (monster?: Monster) => {
    const [stats, setStats] = useState(monster?.stats || { str: 0, vit: 0, dex: 0, int: 0 });
    const [attributes, setAttributes] = useState(monster?.attributes || {});
    const [level, setLevel] = useState(monster?.level || 0);
    useEffect(() => {
        if (!monster) return;
        setStats(monster.stats)
        setAttributes(monster.attributes)
        setLevel(monster.level)
    }, [monster])

    return { stats, attributes, level, setStats, setAttributes, setLevel }
}