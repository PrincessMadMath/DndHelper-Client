const uiMonster = {
  'ui:order': [
    'name',
    'size',
    'type',
    'subtype',
    'alignment',
    'armorClass',
    'hitPoints',
    'hitDice',
    'speed',
    'abilities',
    'skills',
    'saves',
    'resistances',
    'senses',
    'languages',
    'challengeRating',
    'features',
    'actions',
    'legendaryActions'
  ],
  name: {
    'ui:autofocus': true
  },
  skills: {
    items: {
      baseAbility: {
        'ui:widget': 'hidden'
      }
    }
  },
  actions: {
    items: {
      desc: {
        'ui:widget': 'textarea'
      },
      attackBonus: {
        'ui:widget': 'hidden'
      },
      damageDice: {
        'ui:widget': 'hidden'
      },
      damageBonus: {
        'ui:widget': 'hidden'
      }
    }
  },
  specialAbilities: {
    items: {
      desc: {
        'ui:widget': 'textarea'
      }
    }
  },
  legendaryAbilities: {
    items: {
      desc: {
        'ui:widget': 'textarea'
      }
    }
  }
}

const monster = {
  title: 'A monster form',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      title: 'Name'
    },
    challengeRating: {
      type: 'integer',
      title: 'Challenge Rating'
    },
    size: {
      type: 'string',
      title: 'Monster Size',
      enum: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']
    },
    type: {
      // todo
      type: 'string',
      title: 'Type'
    },
    subtype: {
      type: 'string',
      title: 'Subtype'
    },
    alignment: {
      type: 'string',
      title: 'Alignment'
    },
    armorClass: {
      type: 'integer',
      title: 'Armor Class'
    },
    hitPoints: {
      type: 'integer',
      title: 'HP'
    },
    hitDice: {
      type: 'string',
      title: 'Hit dice'
    },
    speed: {
      type: 'string',
      title: 'Speed'
    },
    languages: {
      type: 'string',
      title: 'Languages'
    },
    senses: {
      type: 'string',
      title: 'Senses'
    },
    abilities: {
      type: 'object',
      title: 'Abilities',
      properties: {
        strength: {
          type: 'integer',
          title: 'Strength'
        },
        dexterity: {
          type: 'integer',
          title: 'Dexterity'
        },
        constitution: {
          type: 'integer',
          title: 'Constitution'
        },
        intelligence: {
          type: 'integer',
          title: 'Intelligence'
        },
        wisdom: {
          type: 'integer',
          title: 'Wisdom'
        },
        charisma: {
          type: 'integer',
          title: 'Charisma'
        }
      }
    },
    saves: {
      type: 'array',
      title: 'Saves',
      items: {
        type: 'object',
        required: ['ability', 'modifier'],
        properties: {
          ability: {
            type: 'string',
            title: 'Ability'
          },
          modifier: {
            type: 'integer',
            title: 'Modifier'
          }
        }
      }
    },
    skills: {
      type: 'array',
      title: 'Skills',
      items: {
        type: 'object',
        required: ['name', 'baseAbility', 'modifier'],
        properties: {
          name: {
            type: 'string',
            title: 'Name'
          },
          baseAbility: {
            type: 'string',
            title: 'Base Modifier'
          },
          modifier: {
            type: 'integer',
            title: 'Modifier'
          }
        }
      }
    },
    resistances: {
      type: 'object',
      title: 'Resistances',
      properties: {
        damageVulnerabilities: {
          type: 'array',
          title: 'Damage Vulnerabilities',
          items: {
            type: 'string'
          }
        },
        damageResistance: {
          type: 'array',
          title: 'Damage Resistance',
          items: {
            type: 'string'
          }
        },
        damageImmunities: {
          type: 'array',
          title: 'Damage Immunities',
          items: {
            type: 'string'
          }
        },
        conditionImmunities: {
          type: 'array',
          title: 'Condition Immunities',
          items: {
            type: 'string'
          }
        }
      }
    },
    features: {
      type: 'array',
      title: 'Features',
      items: {
        type: 'object',
        required: ['name', 'desc'],
        properties: {
          name: {
            type: 'string',
            title: 'Name'
          },
          desc: {
            type: 'string',
            title: 'Description'
          }
        }
      }
    },
    actions: {
      type: 'array',
      title: 'Actions',
      items: {
        type: 'object',
        required: ['name', 'desc'],
        properties: {
          name: {
            type: 'string',
            title: 'Name'
          },
          desc: {
            type: 'string',
            title: 'Description'
          },
          attackBonus: {
            type: 'integer',
            title: 'Attack Bonus',
            default: 0
          },
          damageDice: {
            type: 'string',
            title: 'Damage Dice'
          },
          damageBonus: {
            type: 'integer',
            title: 'Damage Bonus',
            default: 0
          }
        }
      }
    },
    legendaryActions: {
      type: 'array',
      title: 'Legendary Actions',
      items: {
        type: 'object',
        required: ['name', 'desc'],
        properties: {
          name: {
            type: 'string',
            title: 'Name'
          },
          desc: {
            type: 'string',
            title: 'Description'
          }
        }
      }
    }
  }
}

module.exports = {
  monster,
  uiMonster
}
