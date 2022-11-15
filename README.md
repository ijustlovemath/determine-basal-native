# determine-basal-native

An attempt to create cross-platform native libraries that gives access to determine-basal from OpenAPS's oref0. Should work with most future versions of it.

# Dependencies
gcc, cmake, npx (via nvm)
lodash (to avoid manually patching OpenAPS); install with `npm i lodash`, then build the minified package with `./scripts/bundle.sh`

# Design

My intended use case is to add an OpenAPS controller to an existing simulator, to see how well it does in an ICU environment.
To accomplish this, I'll be using QuickJS to create a .dll (or .so) from which a developer can:

- enter profile information
- enter glucose information
- receive the temporary basal (rT)
- report errors to caller

The .dll will *interpret* whatever determine_basal.js file it is colocated with. Therefore, there's a *significant* security risk to use this library on any system where determine_basal.js could be modified by an attacker without the looper's knowledge. The output library should only be used in secure, offline contexts, like a simulator.

# requestedTemp (rT)

rT is the object which holds all the info needed to make a basal rate prescription. In particular:

- reason: a string describing the reasoning behind the given rate
- deliverAt: (maybe) a timestamp describing when to start delivering this basal
- duration: duration, in minutes, of the basal
- temp: currently unknown
- rate: the actual basal rate. units currently unknown, most likely "U/hr"

# determine_basal

determine_basal is the function that actually calculates a basal rate. It takes the following inputs:

- glucose_status: the latest glucose value object, output of lib/glucose-get-last
	- needs "delta", "short_avgdelta", updated "date" key with #ms since epoch time
- currenttemp: (maybe) the last output of determine_basal, aka prior value of rT
- iob_data: (maybe) some kind of object containing information about insulin on board
- profile: personal configuration data for the session, settings that affect how determine_basal makes decisions
- autosens_data [optional]: (maybe) some kind of object containing autoconfiguration information used by new users. see: AndroidAPS/For Clinicians for a brief description of this
- meal_data [optional]: an object with information about the latest meals consumed by the looper
- tempBasalFunctions: (maybe) fallback functions for calculating basal rates in certain scenarios
- microBolusAllowed: (probably) a boolean that allows d_b to increase the basal rate by adding in a bolus
- reservoir_data [optional]: (probably) information about how much insulin the pump current has in its reservoir
- currentTime [debug only, optional]: (probably) a Date() object containing the time of request

# Required features
- profile (see lib/profile/index.js)
- 

