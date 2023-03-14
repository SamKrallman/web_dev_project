type Sun = {
  type: 'Red Giant' | 'White Dwarf' | 'Red Dwarf' | 'Hot Blue';
};

type Planet = {
  type: 'Rocky' | 'Gas Giant' | 'Ice Giant';
  potential_rings: boolean;
  inhabitable: boolean;
  moons: Array<Moon>;
};

type Moon = {
  size: 'Small' | 'Medium' | 'Large';
  tidally_locked: boolean;
  inhabitable: boolean;
};

type SolarSystem = {
  planets: Array<Planet>;
  sun: Sun;
};
