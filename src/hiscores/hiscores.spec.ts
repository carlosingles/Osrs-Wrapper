import { afterAll, afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import { mockHiscoreResponse } from '../../test/hiscore-response.mock'
import { HiscoreTypes } from './hiscore-types.enum'
import { getHiscores } from './hiscores.module'

const spyFetch = spyOn(globalThis, 'fetch')

beforeEach(() => {
  spyFetch.mockReset()
})
afterEach(() => spyFetch.mockClear())
afterAll(() => spyFetch.mockRestore())

describe('Hiscores', () => {
  beforeEach(() => {
    const mockedSuccessfulResponse = {
      ok: true,
      json: () => Promise.resolve(mockHiscoreResponse),
    }
    spyFetch.mockResolvedValueOnce(mockedSuccessfulResponse as any)
  })

  describe('getHiscores', () => {
    const playerName = 'Bald'

    it('should make a GET request', async () => {
      await getHiscores(playerName)

      expect(spyFetch.mock.calls[0][0]).toMatchInlineSnapshot(
        `"http://services.runescape.com/m=hiscore_oldschool/index_lite.json?player=Bald"`
      )
    })

    it('should make a request with the passed in player name', async () => {
      await getHiscores(playerName)

      expect(spyFetch.mock.calls[0][0]).toMatchInlineSnapshot(
        `"http://services.runescape.com/m=hiscore_oldschool/index_lite.json?player=Bald"`
      )
    })

    it('should default type to HiscoreTypes.normal', async () => {
      await getHiscores(playerName)

      expect(spyFetch.mock.calls[0][0]).toMatchInlineSnapshot(
        `"http://services.runescape.com/m=hiscore_oldschool/index_lite.json?player=Bald"`
      )
    })

    it('should hit the specified hiscore type endpoint', async () => {
      const hiscoreType = HiscoreTypes.league
      await getHiscores(playerName, hiscoreType)

      expect(spyFetch.mock.calls[0][0]).toMatchInlineSnapshot(
        `"http://services.runescape.com/m=hiscore_oldschool_seasonal/index_lite.json?player=Bald"`
      )
    })

    it('should properly parse rank, level, and xp for each skill', async () => {
      const { skills } = await getHiscores(playerName)

      expect(skills).toMatchInlineSnapshot(`
        {
          "agility": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "attack": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "construction": {
            "level": 35,
            "rank": 1880888,
            "xp": 23692,
          },
          "cooking": {
            "level": 67,
            "rank": 1726825,
            "xp": 598535,
          },
          "crafting": {
            "level": 61,
            "rank": 1699186,
            "xp": 302454,
          },
          "defence": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "farming": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "firemaking": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "fishing": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "fletching": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "herblore": {
            "level": 37,
            "rank": 1932914,
            "xp": 29398,
          },
          "hitpoints": {
            "level": 95,
            "rank": 751194,
            "xp": 9180591,
          },
          "hunter": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "magic": {
            "level": 94,
            "rank": 719392,
            "xp": 7998100,
          },
          "mining": {
            "level": 60,
            "rank": 1908588,
            "xp": 273762,
          },
          "overall": {
            "level": 1227,
            "rank": 1731585,
            "xp": 35239354,
          },
          "prayer": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "ranged": {
            "level": 90,
            "rank": 913609,
            "xp": 5440060,
          },
          "runecrafting": {
            "level": 34,
            "rank": 1696821,
            "xp": 21863,
          },
          "slayer": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
          "smithing": {
            "level": 67,
            "rank": 1226660,
            "xp": 557874,
          },
          "strength": {
            "level": 96,
            "rank": 714548,
            "xp": 9736256,
          },
          "thieving": {
            "level": 54,
            "rank": 1497864,
            "xp": 154853,
          },
          "woodcutting": {
            "level": 1,
            "rank": -1,
            "xp": -1,
          },
        }
      `)
    })

    it('should properly parse rank and score for each minigame', async () => {
      const { minigames } = await getHiscores(playerName)

      expect(minigames).toMatchInlineSnapshot(`
        {
          "bountyHunter": {
            "rank": -1,
            "score": -1,
          },
          "bountyHunterLegacy": {
            "rank": -1,
            "score": -1,
          },
          "bountyHunterRogues": {
            "rank": -1,
            "score": -1,
          },
          "bountyHunterRoguesLegacy": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsAll": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsBeginner": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsEasy": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsElite": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsHard": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsMaster": {
            "rank": -1,
            "score": -1,
          },
          "clueScrollsMedium": {
            "rank": -1,
            "score": -1,
          },
          "collectionsLogged": {
            "rank": -1,
            "score": -1,
          },
          "colosseumGlory": {
            "rank": -1,
            "score": -1,
          },
          "deadmanPoints": {
            "rank": -1,
            "score": -1,
          },
          "leaguePoints": {
            "rank": -1,
            "score": -1,
          },
          "lms": {
            "rank": 126349,
            "score": 712,
          },
          "pvpArena": {
            "rank": 1161,
            "score": 3367,
          },
          "riftsClosed": {
            "rank": -1,
            "score": -1,
          },
          "soulWarsZeal": {
            "rank": -1,
            "score": -1,
          },
        }
      `)
    })

    it('should properly parse rank and kills for each boss', async () => {
      const { bosses } = await getHiscores(playerName)

      expect(bosses).toMatchInlineSnapshot(`
        {
          "abyssalSire": {
            "kills": -1,
            "rank": -1,
          },
          "alchemicalHydra": {
            "kills": -1,
            "rank": -1,
          },
          "amoxliatl": {
            "kills": -1,
            "rank": -1,
          },
          "araxxor": {
            "kills": -1,
            "rank": -1,
          },
          "artio": {
            "kills": -1,
            "rank": -1,
          },
          "barrowsChests": {
            "kills": -1,
            "rank": -1,
          },
          "bryophyta": {
            "kills": -1,
            "rank": -1,
          },
          "callisto": {
            "kills": -1,
            "rank": -1,
          },
          "calvarion": {
            "kills": -1,
            "rank": -1,
          },
          "cerberus": {
            "kills": -1,
            "rank": -1,
          },
          "chambersOfXeric": {
            "kills": -1,
            "rank": -1,
          },
          "chambersOfXericChallengeMode": {
            "kills": -1,
            "rank": -1,
          },
          "chaosElemental": {
            "kills": -1,
            "rank": -1,
          },
          "chaosFanatic": {
            "kills": -1,
            "rank": -1,
          },
          "commanderZilyana": {
            "kills": -1,
            "rank": -1,
          },
          "corporealBeast": {
            "kills": -1,
            "rank": -1,
          },
          "corruptedGauntlet": {
            "kills": -1,
            "rank": -1,
          },
          "crazyArchaeologist": {
            "kills": -1,
            "rank": -1,
          },
          "dagannothPrime": {
            "kills": -1,
            "rank": -1,
          },
          "dagannothRex": {
            "kills": -1,
            "rank": -1,
          },
          "dagannothSupreme": {
            "kills": -1,
            "rank": -1,
          },
          "derangedArchaeologist": {
            "kills": -1,
            "rank": -1,
          },
          "dukeSucellus": {
            "kills": -1,
            "rank": -1,
          },
          "gauntlet": {
            "kills": -1,
            "rank": -1,
          },
          "generalGraardor": {
            "kills": -1,
            "rank": -1,
          },
          "giantMole": {
            "kills": -1,
            "rank": -1,
          },
          "grotesqueGuardians": {
            "kills": -1,
            "rank": -1,
          },
          "hespori": {
            "kills": -1,
            "rank": -1,
          },
          "hueycoatl": {
            "kills": -1,
            "rank": -1,
          },
          "kalphiteQueen": {
            "kills": -1,
            "rank": -1,
          },
          "kingBlackDragon": {
            "kills": -1,
            "rank": -1,
          },
          "kraken": {
            "kills": -1,
            "rank": -1,
          },
          "krilTsutsaroth": {
            "kills": -1,
            "rank": -1,
          },
          "leviathan": {
            "kills": -1,
            "rank": -1,
          },
          "lunarChests": {
            "kills": -1,
            "rank": -1,
          },
          "mimic": {
            "kills": -1,
            "rank": -1,
          },
          "nex": {
            "kills": -1,
            "rank": -1,
          },
          "nightmare": {
            "kills": -1,
            "rank": -1,
          },
          "obor": {
            "kills": -1,
            "rank": -1,
          },
          "phantomMuspah": {
            "kills": -1,
            "rank": -1,
          },
          "phosanisNightmare": {
            "kills": -1,
            "rank": -1,
          },
          "royalTitans": {
            "kills": -1,
            "rank": -1,
          },
          "sarachnis": {
            "kills": -1,
            "rank": -1,
          },
          "scorpia": {
            "kills": -1,
            "rank": -1,
          },
          "scurrius": {
            "kills": -1,
            "rank": -1,
          },
          "skotizo": {
            "kills": -1,
            "rank": -1,
          },
          "solHeredit": {
            "kills": -1,
            "rank": -1,
          },
          "spindel": {
            "kills": -1,
            "rank": -1,
          },
          "tempoross": {
            "kills": -1,
            "rank": -1,
          },
          "theatreOfBlood": {
            "kills": -1,
            "rank": -1,
          },
          "theatreOfBloodHardMode": {
            "kills": -1,
            "rank": -1,
          },
          "thermonuclearSmokeDevil": {
            "kills": -1,
            "rank": -1,
          },
          "tombsOfAmascut": {
            "kills": -1,
            "rank": -1,
          },
          "tombsOfAmascutExpertMode": {
            "kills": -1,
            "rank": -1,
          },
          "tzKalZuk": {
            "kills": -1,
            "rank": -1,
          },
          "tzTokJad": {
            "kills": -1,
            "rank": -1,
          },
          "vardorvis": {
            "kills": -1,
            "rank": -1,
          },
          "venenatis": {
            "kills": -1,
            "rank": -1,
          },
          "vetion": {
            "kills": -1,
            "rank": -1,
          },
          "vorkath": {
            "kills": -1,
            "rank": -1,
          },
          "whisperer": {
            "kills": -1,
            "rank": -1,
          },
          "wintertodt": {
            "kills": -1,
            "rank": -1,
          },
          "zalcano": {
            "kills": -1,
            "rank": -1,
          },
          "zulrah": {
            "kills": -1,
            "rank": -1,
          },
        }
      `)
    })

    it('should return skills, minigames, and bosses from a json response', async () => {
      const output = await getHiscores(playerName)

      expect(output).toMatchInlineSnapshot(`
        {
          "bosses": {
            "abyssalSire": {
              "kills": -1,
              "rank": -1,
            },
            "alchemicalHydra": {
              "kills": -1,
              "rank": -1,
            },
            "amoxliatl": {
              "kills": -1,
              "rank": -1,
            },
            "araxxor": {
              "kills": -1,
              "rank": -1,
            },
            "artio": {
              "kills": -1,
              "rank": -1,
            },
            "barrowsChests": {
              "kills": -1,
              "rank": -1,
            },
            "bryophyta": {
              "kills": -1,
              "rank": -1,
            },
            "callisto": {
              "kills": -1,
              "rank": -1,
            },
            "calvarion": {
              "kills": -1,
              "rank": -1,
            },
            "cerberus": {
              "kills": -1,
              "rank": -1,
            },
            "chambersOfXeric": {
              "kills": -1,
              "rank": -1,
            },
            "chambersOfXericChallengeMode": {
              "kills": -1,
              "rank": -1,
            },
            "chaosElemental": {
              "kills": -1,
              "rank": -1,
            },
            "chaosFanatic": {
              "kills": -1,
              "rank": -1,
            },
            "commanderZilyana": {
              "kills": -1,
              "rank": -1,
            },
            "corporealBeast": {
              "kills": -1,
              "rank": -1,
            },
            "corruptedGauntlet": {
              "kills": -1,
              "rank": -1,
            },
            "crazyArchaeologist": {
              "kills": -1,
              "rank": -1,
            },
            "dagannothPrime": {
              "kills": -1,
              "rank": -1,
            },
            "dagannothRex": {
              "kills": -1,
              "rank": -1,
            },
            "dagannothSupreme": {
              "kills": -1,
              "rank": -1,
            },
            "derangedArchaeologist": {
              "kills": -1,
              "rank": -1,
            },
            "dukeSucellus": {
              "kills": -1,
              "rank": -1,
            },
            "gauntlet": {
              "kills": -1,
              "rank": -1,
            },
            "generalGraardor": {
              "kills": -1,
              "rank": -1,
            },
            "giantMole": {
              "kills": -1,
              "rank": -1,
            },
            "grotesqueGuardians": {
              "kills": -1,
              "rank": -1,
            },
            "hespori": {
              "kills": -1,
              "rank": -1,
            },
            "hueycoatl": {
              "kills": -1,
              "rank": -1,
            },
            "kalphiteQueen": {
              "kills": -1,
              "rank": -1,
            },
            "kingBlackDragon": {
              "kills": -1,
              "rank": -1,
            },
            "kraken": {
              "kills": -1,
              "rank": -1,
            },
            "krilTsutsaroth": {
              "kills": -1,
              "rank": -1,
            },
            "leviathan": {
              "kills": -1,
              "rank": -1,
            },
            "lunarChests": {
              "kills": -1,
              "rank": -1,
            },
            "mimic": {
              "kills": -1,
              "rank": -1,
            },
            "nex": {
              "kills": -1,
              "rank": -1,
            },
            "nightmare": {
              "kills": -1,
              "rank": -1,
            },
            "obor": {
              "kills": -1,
              "rank": -1,
            },
            "phantomMuspah": {
              "kills": -1,
              "rank": -1,
            },
            "phosanisNightmare": {
              "kills": -1,
              "rank": -1,
            },
            "royalTitans": {
              "kills": -1,
              "rank": -1,
            },
            "sarachnis": {
              "kills": -1,
              "rank": -1,
            },
            "scorpia": {
              "kills": -1,
              "rank": -1,
            },
            "scurrius": {
              "kills": -1,
              "rank": -1,
            },
            "skotizo": {
              "kills": -1,
              "rank": -1,
            },
            "solHeredit": {
              "kills": -1,
              "rank": -1,
            },
            "spindel": {
              "kills": -1,
              "rank": -1,
            },
            "tempoross": {
              "kills": -1,
              "rank": -1,
            },
            "theatreOfBlood": {
              "kills": -1,
              "rank": -1,
            },
            "theatreOfBloodHardMode": {
              "kills": -1,
              "rank": -1,
            },
            "thermonuclearSmokeDevil": {
              "kills": -1,
              "rank": -1,
            },
            "tombsOfAmascut": {
              "kills": -1,
              "rank": -1,
            },
            "tombsOfAmascutExpertMode": {
              "kills": -1,
              "rank": -1,
            },
            "tzKalZuk": {
              "kills": -1,
              "rank": -1,
            },
            "tzTokJad": {
              "kills": -1,
              "rank": -1,
            },
            "vardorvis": {
              "kills": -1,
              "rank": -1,
            },
            "venenatis": {
              "kills": -1,
              "rank": -1,
            },
            "vetion": {
              "kills": -1,
              "rank": -1,
            },
            "vorkath": {
              "kills": -1,
              "rank": -1,
            },
            "whisperer": {
              "kills": -1,
              "rank": -1,
            },
            "wintertodt": {
              "kills": -1,
              "rank": -1,
            },
            "zalcano": {
              "kills": -1,
              "rank": -1,
            },
            "zulrah": {
              "kills": -1,
              "rank": -1,
            },
          },
          "minigames": {
            "bountyHunter": {
              "rank": -1,
              "score": -1,
            },
            "bountyHunterLegacy": {
              "rank": -1,
              "score": -1,
            },
            "bountyHunterRogues": {
              "rank": -1,
              "score": -1,
            },
            "bountyHunterRoguesLegacy": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsAll": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsBeginner": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsEasy": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsElite": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsHard": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsMaster": {
              "rank": -1,
              "score": -1,
            },
            "clueScrollsMedium": {
              "rank": -1,
              "score": -1,
            },
            "collectionsLogged": {
              "rank": -1,
              "score": -1,
            },
            "colosseumGlory": {
              "rank": -1,
              "score": -1,
            },
            "deadmanPoints": {
              "rank": -1,
              "score": -1,
            },
            "leaguePoints": {
              "rank": -1,
              "score": -1,
            },
            "lms": {
              "rank": 126349,
              "score": 712,
            },
            "pvpArena": {
              "rank": 1161,
              "score": 3367,
            },
            "riftsClosed": {
              "rank": -1,
              "score": -1,
            },
            "soulWarsZeal": {
              "rank": -1,
              "score": -1,
            },
          },
          "skills": {
            "agility": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "attack": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "construction": {
              "level": 35,
              "rank": 1880888,
              "xp": 23692,
            },
            "cooking": {
              "level": 67,
              "rank": 1726825,
              "xp": 598535,
            },
            "crafting": {
              "level": 61,
              "rank": 1699186,
              "xp": 302454,
            },
            "defence": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "farming": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "firemaking": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "fishing": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "fletching": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "herblore": {
              "level": 37,
              "rank": 1932914,
              "xp": 29398,
            },
            "hitpoints": {
              "level": 95,
              "rank": 751194,
              "xp": 9180591,
            },
            "hunter": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "magic": {
              "level": 94,
              "rank": 719392,
              "xp": 7998100,
            },
            "mining": {
              "level": 60,
              "rank": 1908588,
              "xp": 273762,
            },
            "overall": {
              "level": 1227,
              "rank": 1731585,
              "xp": 35239354,
            },
            "prayer": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "ranged": {
              "level": 90,
              "rank": 913609,
              "xp": 5440060,
            },
            "runecrafting": {
              "level": 34,
              "rank": 1696821,
              "xp": 21863,
            },
            "slayer": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
            "smithing": {
              "level": 67,
              "rank": 1226660,
              "xp": 557874,
            },
            "strength": {
              "level": 96,
              "rank": 714548,
              "xp": 9736256,
            },
            "thieving": {
              "level": 54,
              "rank": 1497864,
              "xp": 154853,
            },
            "woodcutting": {
              "level": 1,
              "rank": -1,
              "xp": -1,
            },
          },
        }
      `)
    })
  })
})
