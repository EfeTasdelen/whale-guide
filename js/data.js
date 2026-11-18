// Copy of data/whales.json so the site also works when opened by double-click (file://).
// After editing the JSON, run: python tools/copy_data.py
window.WHALES = {
  "version": "0.3",
  "updated": "2026-11-18",
  "note": "Size, weight and status from NOAA Fisheries species pages and the IUCN Red List (checked 2026-11-18). Record dives from tagging studies listed per species. Watching months are typical seasons and vary by year.",
  "conservationCodes": {
    "CR": "Critically endangered",
    "EN": "Endangered",
    "VU": "Vulnerable",
    "NT": "Near threatened",
    "LC": "Least concern",
    "DD": "Data deficient"
  },
  "depthZones": [
    {
      "id": "sunlight",
      "name": "Sunlight zone",
      "top": 0,
      "bottom": 200,
      "description": "Where light still reaches. Krill and schools of fish live here, and most whales follow them."
    },
    {
      "id": "twilight",
      "name": "Twilight zone",
      "top": 200,
      "bottom": 1000,
      "description": "Light fades with every metre. Hunters find their prey by sound."
    },
    {
      "id": "midnight",
      "name": "Midnight zone",
      "top": 1000,
      "bottom": 3000,
      "description": "No sunlight at all. Only expert divers come down here to hunt squid."
    }
  ],
  "regions": [
    {
      "id": "husavik",
      "name": "Húsavík",
      "country": "Iceland",
      "location": {
        "lat": 66.05,
        "lng": -17.34
      },
      "oceanConditionsRegion": "iceland"
    },
    {
      "id": "faxafloi",
      "name": "Faxaflói Bay (Reykjavík)",
      "country": "Iceland",
      "location": {
        "lat": 64.15,
        "lng": -22.1
      },
      "oceanConditionsRegion": "iceland"
    },
    {
      "id": "tromso",
      "name": "Tromsø fjords",
      "country": "Norway",
      "location": {
        "lat": 69.65,
        "lng": 18.96
      },
      "oceanConditionsRegion": "norway"
    },
    {
      "id": "andenes",
      "name": "Andenes",
      "country": "Norway",
      "location": {
        "lat": 69.32,
        "lng": 16.12
      },
      "oceanConditionsRegion": "norway"
    },
    {
      "id": "azores",
      "name": "Pico and Faial",
      "country": "Azores (Portugal)",
      "location": {
        "lat": 38.46,
        "lng": -28.33
      },
      "oceanConditionsRegion": "azores"
    },
    {
      "id": "canaries",
      "name": "El Hierro and La Gomera",
      "country": "Canary Islands (Spain)",
      "location": {
        "lat": 27.95,
        "lng": -17.6
      },
      "oceanConditionsRegion": "canaries"
    },
    {
      "id": "samana",
      "name": "Samaná Bay",
      "country": "Dominican Republic",
      "location": {
        "lat": 19.2,
        "lng": -69.3
      },
      "oceanConditionsRegion": "dominican"
    },
    {
      "id": "dominica",
      "name": "Dominica coast",
      "country": "Dominica",
      "location": {
        "lat": 15.4,
        "lng": -61.45
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "san-ignacio",
      "name": "San Ignacio Lagoon",
      "country": "Baja California (Mexico)",
      "location": {
        "lat": 26.8,
        "lng": -113.25
      },
      "oceanConditionsRegion": "baja"
    },
    {
      "id": "loreto",
      "name": "Loreto",
      "country": "Baja California (Mexico)",
      "location": {
        "lat": 26.0,
        "lng": -111.3
      },
      "oceanConditionsRegion": "baja"
    },
    {
      "id": "monterey",
      "name": "Monterey Bay",
      "country": "California (USA)",
      "location": {
        "lat": 36.8,
        "lng": -122.0
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "maui",
      "name": "Maui",
      "country": "Hawaii (USA)",
      "location": {
        "lat": 20.8,
        "lng": -156.6
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "mirissa",
      "name": "Mirissa",
      "country": "Sri Lanka",
      "location": {
        "lat": 5.8,
        "lng": 80.45
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "san-juan",
      "name": "San Juan Islands",
      "country": "Washington (USA)",
      "location": {
        "lat": 48.53,
        "lng": -123.08
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "punta-norte",
      "name": "Punta Norte, Valdés Peninsula",
      "country": "Argentina",
      "location": {
        "lat": -42.07,
        "lng": -63.75
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "kaikoura",
      "name": "Kaikōura",
      "country": "New Zealand",
      "location": {
        "lat": -42.4,
        "lng": 173.68
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "oregon",
      "name": "Depoe Bay",
      "country": "Oregon (USA)",
      "location": {
        "lat": 44.81,
        "lng": -124.1
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "hebrides",
      "name": "Inner Hebrides",
      "country": "Scotland",
      "location": {
        "lat": 56.8,
        "lng": -6.6
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "ligurian",
      "name": "Pelagos Sanctuary, Ligurian Sea",
      "country": "Mediterranean (Italy, France, Monaco)",
      "location": {
        "lat": 43.7,
        "lng": 8.6
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "biscay",
      "name": "Bay of Biscay",
      "country": "off Spain and France",
      "location": {
        "lat": 44.5,
        "lng": -4.5
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "disko",
      "name": "Disko Bay",
      "country": "Greenland",
      "location": {
        "lat": 69.2,
        "lng": -53.5
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "isabella",
      "name": "Isabella Bay, Baffin Island",
      "country": "Canada",
      "location": {
        "lat": 69.6,
        "lng": -67.5
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "churchill",
      "name": "Churchill River estuary",
      "country": "Manitoba (Canada)",
      "location": {
        "lat": 58.77,
        "lng": -94.17
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "tadoussac",
      "name": "Tadoussac, St. Lawrence",
      "country": "Québec (Canada)",
      "location": {
        "lat": 48.14,
        "lng": -69.72
      },
      "oceanConditionsRegion": null
    },
    {
      "id": "svalbard",
      "name": "Svalbard fjords",
      "country": "Norway (Arctic)",
      "location": {
        "lat": 78.2,
        "lng": 15.6
      },
      "oceanConditionsRegion": null
    }
  ],
  "species": [
    {
      "id": "blue",
      "name": "Blue whale",
      "scientificName": "Balaenoptera musculus",
      "length": {
        "min": 24,
        "max": 33,
        "unit": "m"
      },
      "weight": {
        "min": 100,
        "max": 150,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Almost exclusively krill. Can eat 3 to 4 tonnes a day in peak feeding season.",
      "status": "EN",
      "dive": {
        "typicalMeters": 150,
        "recordMeters": 500
      },
      "depthZone": "sunlight",
      "summary": "The largest animal that has ever lived. It gulps tonnes of water and strains out krill through its baleen plates.",
      "funFact": "Its heart is the size of a small car, and its calls carry for hundreds of kilometres.",
      "sightings": [
        {
          "region": "mirissa",
          "months": [
            12,
            1,
            2,
            3,
            4
          ]
        },
        {
          "region": "monterey",
          "months": [
            6,
            7,
            8,
            9,
            10
          ]
        },
        {
          "region": "azores",
          "months": [
            3,
            4,
            5
          ]
        },
        {
          "region": "loreto",
          "months": [
            2,
            3,
            4
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_170304_0edea641-56d6-41eb-9439-94fe8696bac3.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/blue-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Cornell-NY-LongIsland-20090123-000000-LPfilter20-amplified-x8speed-blue-clip.mp3",
        "label": "Song",
        "note": "Sped up 8 times: the real call is too low for human ears.",
        "credit": "NOAA NEFSC Passive Acoustics, recording by Cornell University",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "humpback",
      "name": "Humpback whale",
      "scientificName": "Megaptera novaeangliae",
      "length": {
        "min": 12,
        "max": 18,
        "unit": "m"
      },
      "weight": {
        "min": 25,
        "max": 40,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Krill and small schooling fish. Hunts by blowing nets of bubbles.",
      "status": "LC",
      "dive": {
        "typicalMeters": 60,
        "recordMeters": 200
      },
      "depthZone": "sunlight",
      "summary": "Known for its long flippers and spectacular breaches. Migrates thousands of kilometres every year.",
      "funFact": "Males sing songs that last for hours and slowly change from season to season.",
      "sightings": [
        {
          "region": "husavik",
          "months": [
            6,
            7,
            8
          ]
        },
        {
          "region": "samana",
          "months": [
            1,
            2,
            3
          ]
        },
        {
          "region": "tromso",
          "months": [
            11,
            12,
            1
          ]
        },
        {
          "region": "maui",
          "months": [
            12,
            1,
            2,
            3,
            4
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171024_90d883a7-4e25-4b00-b1f5-f25b80f7e71f.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/humpback-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Meno-song-NOAA-PAGroup-13-humpback-clip.mp3",
        "label": "Song",
        "note": "Real speed. Males sing these songs for hours.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "orca",
      "name": "Orca (killer whale)",
      "scientificName": "Orcinus orca",
      "length": {
        "min": 6,
        "max": 9.8,
        "unit": "m"
      },
      "weight": {
        "min": 3,
        "max": 10,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Fish, seals, sea lions and even other whales. Each population specialises in its own prey.",
      "status": "DD",
      "dive": {
        "typicalMeters": 50,
        "recordMeters": 1087
      },
      "depthZone": "sunlight",
      "summary": "Actually the largest member of the dolphin family. Lives in tight family pods led by the mothers.",
      "funFact": "Each pod communicates in its own dialect.",
      "sightings": [
        {
          "region": "tromso",
          "months": [
            11,
            12,
            1
          ]
        },
        {
          "region": "san-juan",
          "months": [
            5,
            6,
            7,
            8,
            9
          ]
        },
        {
          "region": "punta-norte",
          "months": [
            3,
            4,
            10,
            11
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171025_f31e8ea5-5bda-4540-9a5d-aaa62451ceac.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/killer-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Towers et al. 2019, 1,087 m dive off South Georgia (Hakai Magazine)",
          "url": "https://hakaimagazine.com/news/a-record-breaking-dive-by-a-hungry-killer-whale/"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Oror-Multisound-AWI-Van-Opzeeland-01-killer-clip.mp3",
        "label": "Clicks and whistles",
        "note": "Real speed.",
        "credit": "NOAA NEFSC Passive Acoustics, recording by I. Van Opzeeland (AWI)",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "sperm",
      "name": "Sperm whale",
      "scientificName": "Physeter macrocephalus",
      "length": {
        "min": 11,
        "max": 16,
        "unit": "m"
      },
      "weight": {
        "min": 15,
        "max": 45,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Giant and medium-sized squid from the deep sea.",
      "status": "VU",
      "dive": {
        "typicalMeters": 1000,
        "recordMeters": 2000
      },
      "depthZone": "midnight",
      "summary": "The largest toothed whale. Its huge square head leads dives of more than an hour into the dark.",
      "funFact": "It has the largest brain of any animal, about 8 kilograms.",
      "sightings": [
        {
          "region": "azores",
          "months": [
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ]
        },
        {
          "region": "andenes",
          "months": [
            5,
            6,
            7,
            8,
            9
          ]
        },
        {
          "region": "kaikoura",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        },
        {
          "region": "dominica",
          "months": [
            11,
            12,
            1,
            2,
            3
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171023_ffa7222e-864c-4436-b5bc-ba82c9817623.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/sperm-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Phma-clicks-NOAA-PAGroup-01-sperm-clip.mp3",
        "label": "Echolocation clicks",
        "note": "Real speed. The loudest sound made by any animal.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "gray",
      "name": "Gray whale",
      "scientificName": "Eschrichtius robustus",
      "length": {
        "min": 13,
        "max": 15,
        "unit": "m"
      },
      "weight": {
        "min": 15,
        "max": 41,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Small crustaceans on the sea floor. It sucks up mud and filters it.",
      "status": "LC",
      "dive": {
        "typicalMeters": 20,
        "recordMeters": 120
      },
      "depthZone": "sunlight",
      "summary": "No dorsal fin, and skin covered in barnacles and whale lice. In the lagoons it often swims up to boats.",
      "funFact": "Its round-trip migration of more than 16,000 km is one of the longest of any mammal.",
      "sightings": [
        {
          "region": "san-ignacio",
          "months": [
            1,
            2,
            3,
            4
          ]
        },
        {
          "region": "oregon",
          "months": [
            12,
            1,
            3,
            4,
            6,
            7,
            8,
            9,
            10
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171024_e233f38d-9fb6-41ef-9223-4516cea68333.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/gray-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Oregon Coast summer resident gray whales",
          "url": "https://visittheoregoncoast.com/travel-guides/summer-resident-whale-watching/"
        }
      ]
    },
    {
      "id": "minke",
      "name": "Common minke whale",
      "scientificName": "Balaenoptera acutorostrata",
      "length": {
        "min": 7,
        "max": 10,
        "unit": "m"
      },
      "weight": {
        "min": 5,
        "max": 10,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Krill and small fish such as herring and mackerel.",
      "status": "LC",
      "dive": {
        "typicalMeters": 30,
        "recordMeters": 100
      },
      "depthZone": "sunlight",
      "summary": "The smallest of the rorquals. Fast and curious, it surfaces briefly and disappears.",
      "funFact": "The white band on each flipper is the easiest way to recognise it.",
      "sightings": [
        {
          "region": "faxafloi",
          "months": [
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ]
        },
        {
          "region": "hebrides",
          "months": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171026_b3b058f0-9ce2-4d85-b97a-0385be527412.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/minke-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Baac-pulsetrains-NOAA-PAGroup-25-minke-clip.mp3",
        "label": "Pulse trains",
        "note": "Real speed.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "fin",
      "name": "Fin whale",
      "scientificName": "Balaenoptera physalus",
      "length": {
        "min": 18,
        "max": 26,
        "unit": "m"
      },
      "weight": {
        "min": 40,
        "max": 80,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Krill and small schooling fish.",
      "status": "VU",
      "dive": {
        "typicalMeters": 100,
        "recordMeters": 470
      },
      "depthZone": "sunlight",
      "summary": "The second largest animal on Earth, nicknamed the greyhound of the sea. It also lives in the Mediterranean.",
      "funFact": "It can swim faster than 35 km/h.",
      "sightings": [
        {
          "region": "ligurian",
          "months": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "region": "azores",
          "months": [
            4,
            5,
            6
          ]
        },
        {
          "region": "biscay",
          "months": [
            7,
            8,
            9
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171024_9c72cf0c-19a6-422a-91a9-9e1cd178d916.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/fin-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Panigada et al. 2003, Ligurian Sea dive data (470 m measured)",
          "url": "https://polaris.nipr.ac.jp/~penguin/penguiness/baleen/balaenopteridae/fin.html"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Baph-song-NOAA-PAGroup-05-x5speed-fin-clip.mp3",
        "label": "Song",
        "note": "Sped up 5 times: the real pulses are too low to hear.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "bowhead",
      "name": "Bowhead whale",
      "scientificName": "Balaena mysticetus",
      "length": {
        "min": 14,
        "max": 18,
        "unit": "m"
      },
      "weight": {
        "min": 75,
        "max": 100,
        "unit": "t"
      },
      "teeth": "baleen",
      "diet": "Tiny crustaceans called copepods, and krill.",
      "status": "LC",
      "dive": {
        "typicalMeters": 20,
        "recordMeters": 416
      },
      "depthZone": "sunlight",
      "summary": "Spends its whole life among Arctic sea ice and breaks through it with its massive skull to breathe.",
      "funFact": "The only mammal known to live for more than 200 years.",
      "sightings": [
        {
          "region": "disko",
          "months": [
            3,
            4,
            5
          ]
        },
        {
          "region": "isabella",
          "months": [
            7,
            8,
            9
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171025_9730e71e-0a43-483a-b714-8ee3398742d1.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/bowhead-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Heide-Jørgensen et al. 2003, Disko Bay tag (416 m)",
          "url": "https://polaris.nipr.ac.jp/~penguin/penguiness/baleen/balaenidae/bowhead.html"
        }
      ]
    },
    {
      "id": "beluga",
      "name": "Beluga",
      "scientificName": "Delphinapterus leucas",
      "length": {
        "min": 4,
        "max": 6,
        "unit": "m"
      },
      "weight": {
        "min": 1,
        "max": 1.5,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Fish, squid, shrimp and animals on the sea floor.",
      "status": "LC",
      "dive": {
        "typicalMeters": 300,
        "recordMeters": 900
      },
      "depthZone": "twilight",
      "summary": "Pure white with a round forehead, the most talkative whale of the Arctic. Sailors called it the sea canary.",
      "funFact": "Its neck vertebrae are not fused, so it can turn its head.",
      "sightings": [
        {
          "region": "churchill",
          "months": [
            7,
            8
          ]
        },
        {
          "region": "tadoussac",
          "months": [
            6,
            7,
            8,
            9,
            10
          ]
        },
        {
          "region": "svalbard",
          "months": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171027_a96d30aa-1686-43e9-87a8-669c6baa1fa3.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/beluga-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "University of Washington 2016, beluga dive study",
          "url": "https://www.washington.edu/news/2016/02/12/rare-beluga-data-show-whales-dive-to-maximize-meals"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Dele-multisound-NOAA-Castellote-01-beluga-clip.mp3",
        "label": "Whistles and calls",
        "note": "Real speed. This is why sailors called it the sea canary.",
        "credit": "NOAA, recording by M. Castellote",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "cuvier",
      "name": "Cuvier's beaked whale",
      "scientificName": "Ziphius cavirostris",
      "length": {
        "min": 5,
        "max": 7,
        "unit": "m"
      },
      "weight": {
        "min": 2,
        "max": 3,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Deep-sea squid and fish.",
      "status": "LC",
      "dive": {
        "typicalMeters": 1000,
        "recordMeters": 2992
      },
      "depthZone": "midnight",
      "summary": "The deepest and longest-diving mammal. Spends most of its life where sunlight never reaches.",
      "funFact": "Dives to 2,992 m and lasting over 3 hours have been recorded.",
      "sightings": [
        {
          "region": "ligurian",
          "months": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "region": "biscay",
          "months": [
            7,
            8,
            9
          ]
        },
        {
          "region": "canaries",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_171028_c069309e-7908-4481-9b23-fd361519c453.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/cuviers-beaked-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Schorr et al. 2014, 2,992 m dive (National Geographic)",
          "url": "https://www.nationalgeographic.com/animals/article/140326-cuvier-beaked-whale-record-dive-depth-ocean-animal-science"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Zica-clicks-NOAA-PAGroup-01-0.3x-HPF12kHz-cuviers-clip.mp3",
        "label": "Echolocation clicks",
        "note": "Slowed down to 0.3 times: the real clicks are too high to hear.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "pilot",
      "name": "Short-finned pilot whale",
      "scientificName": "Globicephala macrorhynchus",
      "length": {
        "min": 3.7,
        "max": 7.3,
        "unit": "m"
      },
      "weight": {
        "min": 1,
        "max": 3,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Mostly squid, some fish and octopus. Hunts in water 300 m deep or more.",
      "status": "LC",
      "dive": {
        "typicalMeters": 500,
        "recordMeters": 1000
      },
      "depthZone": "twilight",
      "summary": "Jet black with a round, bulbous forehead. Lives in close family groups that stay together for life.",
      "funFact": "Off Tenerife they sprint after squid at up to 9 m/s, which earned them the name cheetahs of the deep sea.",
      "sightings": [
        {
          "region": "canaries",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        },
        {
          "region": "maui",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_173724_52060a26-6445-43cc-a074-740fa5fc3e32.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/short-finned-pilot-whale"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Aguilar Soto et al. 2008, Tenerife dive study (WHOI)",
          "url": "https://www.whoi.edu/oceanus/feature/pilot-whales-the-cheetahs-of-the-deep-sea/?id=41906"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Glsp-Multisound-NOAA-PAGroup-01-pilot-whale-clip.mp3",
        "label": "Clicks and whistles",
        "note": "Real speed.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    },
    {
      "id": "risso",
      "name": "Risso's dolphin",
      "scientificName": "Grampus griseus",
      "length": {
        "min": 2.6,
        "max": 4,
        "unit": "m"
      },
      "weight": {
        "min": 0.3,
        "max": 0.5,
        "unit": "t"
      },
      "teeth": "toothed",
      "diet": "Mostly squid, plus octopus, cuttlefish and small fish. Feeds mainly at night.",
      "status": "LC",
      "dive": {
        "typicalMeters": 100,
        "recordMeters": 528
      },
      "depthZone": "twilight",
      "summary": "A big grey dolphin with a blunt head and no beak. Adults turn almost white with the scars left by squid and other dolphins.",
      "funFact": "Its scars never fade, so researchers tell individuals apart by their scratch patterns.",
      "sightings": [
        {
          "region": "azores",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        },
        {
          "region": "monterey",
          "months": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        },
        {
          "region": "ligurian",
          "months": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "image": "https://d8j0ntlcm91z4.cloudfront.net/user_3LgzkvR88IcirESPCrVny2RQ7gd/hf_20261118_173724_d88e16bd-2ba6-4789-9814-a7a837ee48a3.png",
      "sources": [
        {
          "name": "NOAA Fisheries species page",
          "url": "https://www.fisheries.noaa.gov/species/rissos-dolphin"
        },
        {
          "name": "IUCN Red List",
          "url": "https://www.iucnredlist.org/"
        },
        {
          "name": "Rone et al. 2022, Southern California tag study",
          "url": "https://www.frontiersin.org/articles/10.3389/fmars.2022.873548"
        }
      ],
      "sound": {
        "url": "https://www.fisheries.noaa.gov/s3/2023-04/Grgr-clicks-NOAA-PAGroup-08-rissos-dolphin-clip.mp3",
        "label": "Echolocation clicks",
        "note": "Real speed.",
        "credit": "NOAA NEFSC Passive Acoustics",
        "source": "https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals"
      }
    }
  ]
};
