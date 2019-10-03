/* Utils */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

import { Spell } from "../Spell";
import { DBContext } from "../App";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: 0,
        background: 0,
        border: 0,
    },
};

const propTypes = {
    name: PropTypes.string.isRequired,
};

export const SpellModal = ({ name }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const get_spell_component = spellsDB => {
        // Remove all non Alpha characters (we have ' and ` mismatches in our lists)
        const lookingFor = name.replace(/\W/g, "").toLowerCase();
        const spellIndex = spellsDB
            .map(spell => spell.name.replace(/\W/g, "").toLowerCase())
            .findIndex(
                // sometimes the spell info in the monster has more details
                // e.g. (cast daily).
                x => lookingFor.includes(x)
            );

        if (spellIndex === -1) {
            const errorMsg = "Could not find spell " + name;
            console.error(errorMsg);
            return <span>Error: {errorMsg}</span>;
        } else {
            return <Spell spell={spellsDB[spellIndex]} opened={true} />;
        }
    };

    return (
        <span>
            <span className="underline pointer" onClick={openModal}>
                {name}
            </span>
            {modalIsOpen && (
                <Modal isOpen={true} onRequestClose={closeModal} style={customStyles}>
                    <DBContext.Consumer>
                        {value => get_spell_component(value.spellsDB)}
                    </DBContext.Consumer>

                    <MdClose
                        size={30}
                        className="bg-white br-100 ba hover-red pointer absolute right-1 top-1"
                        onClick={closeModal}
                    />
                </Modal>
            )}
        </span>
    );
};

SpellModal.propTypes = propTypes;
