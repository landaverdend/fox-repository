import requests
import argparse
from dotenv import dotenv_values 

env = dotenv_values()

url = "https://api.stack-auth.com/api/v1/project-permissions/{user_id}/{permission_id}"
headers = {
  'Content-Type': 'application/json',
  'x-stack-publishable-client-key': env.get('STACK_PUBLISHABLE_CLIENT_KEY'),
  'x-stack-access-type': env.get('STACK_ACCESS_TYPE', 'server'),
  'x-stack-project-id': env.get('NEXT_PUBLIC_STACK_PROJECT_ID'),
  'x-stack-secret-server-key': env.get('STACK_SECRET_SERVER_KEY') 
}


def main():
  parser = argparse.ArgumentParser(description="Admin tools") 

  parser.add_argument('user_id', type=str, help='User ID')
  parser.add_argument('permission_id', type=str, help='Permission')

  args = parser.parse_args()

  url = f"https://api.stack-auth.com/api/v1/project-permissions/{args.user_id}/{args.permission_id}"

  response = requests.post(url, headers=headers, json={}) 
  print(response.json())


if __name__ == "__main__":
  main()