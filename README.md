## Quick Start

```bash
# Install dependencies
npm install

# Run the React client
npm start

# Client runson http://localhost:3000
```

##

Project should have globar variable file `.env` with content:

`REACT_APP_API_KEY=YOUR_KEY_GOES_THERE`
`REACT_APP_API_REGIONS_URL=http://apiv3.iucnredlist.org/api/v3/region/list?token=`
`REACT_APP_API_SPECIES_URL=http://apiv3.iucnredlist.org/api/v3/species/region/`
`REACT_APP_API_CONSERV_URL=http://apiv3.iucnredlist.org/api/v3/measures/species/id/`
`REACT_APP_API_COMPGROUP_URL=http://apiv3.iucnredlist.org/api/v3/comp-group/getspecies/`
