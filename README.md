
# Requirements:
- `Node v20.18.0`
- `pnpm 10.14.0`
- `pip`


## Getting Started

```
pnpm i
```




## Installing DB

Generate ORM Files locally

```
pnpm prisma generate
```

Connect to DB instance and write schema

```
pnpm prisma db push
```

Seed Database

```
pnpm prisma db seed
```

## Adding User Permission

Copy keys to `stack/tools/.env` file. Message me for keys.

To mark a user as an admin, run the following:

```
cd stack/tools/
pip install -r requirements.txt
```


```
python add_perm.py 413abb9e-2a4b-4881-9298-ec0e9f3f4b18 admin
```

