# WatchTower

Watchtower is intended as a lightweight diet management tool. NOT a diet app, and in fact we are hoping to avoid anything that could adversely affect people with a history of disordered eating. Instead, the hope is that by logging meal with relevant details about preperation/environment/etc, paired with reminders at a user-defined interval after each meal is logged to add more detail about how the food affected the user; we can build an effective food diary that can highlight trends in what foods a user may be sensitive to.

## Development Setup

Make sure you have the following dependencies installed:

- Docker
- Node
- Yarn
- Android Studio (to provide an android emulator), otherwise you can use the iOS equivalent


### Step 1

Run  the `setup.sh` script from the base of the repository. This should set up all the local dependencies including datastores. As mentioned above, please set up and run an emulator for your desired mobile platform ahead of time. 