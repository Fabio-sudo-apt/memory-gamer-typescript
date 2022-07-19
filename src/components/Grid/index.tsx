import { useRef, useState } from "react";
import { duplicateRegenereteSort } from "../../utils/cardUtils";
import { Card, CardPrors } from "../Card";

import './style.css'

export interface GridProps {
    cards: CardPrors[]
}

export function Grid({ cards }: GridProps) {

    const [useCard, useStateCard] = useState(() => {
        return duplicateRegenereteSort(cards)
    })

    const first = useRef<CardPrors | null>(null)
    const second = useRef<CardPrors | null>(null)
    const unFlipped = useRef(false)

    const [matches, setStateMatche] = useState(0)
    const [moves, setStateMove] = useState(0)

    const handleResert = () => {
        useStateCard(duplicateRegenereteSort(cards))
        first.current = null
        second.current = null
        setStateMatche(0)
        setStateMove(0)
    }

    const handleClick = (id: string) => {
        const newStateCard = useCard.map((card) => {
            if (card.id !== id) return card;
            if (card.flipped) return card;

            if (unFlipped && first.current && second.current) {
                first.current.flipped = false
                second.current.flipped = false
                first.current = null
                second.current = null
                unFlipped.current = false;
            }

            card.flipped = true;

            if (first.current === null) {
                first.current = card
            } else if (second.current === null) {
                second.current = card
            }

            if (first.current && second.current) {
                if (first.current.back === second.current.back) {
                    first.current = null
                    second.current = null
                    setStateMatche(m => m + 1)
                } else {
                    unFlipped.current = true;
                }
                setStateMove(m => m + 1)
            }
            return card
        })
        useStateCard(newStateCard)
    }

    return (
        <>
            <div className="text">
                <h1>Gamer Memory</h1>
                <p>Moves: {moves} | Matches: {matches} | <button onClick={() => handleResert()}>Resert</button></p>
            </div>
            <div className="grid">
                {useCard.map((card: CardPrors) => {
                    return <Card {...card} key={card.id} handleClick={handleClick} />
                })}
            </div>
        </>
    );
}