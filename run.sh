./build.sh

docker stop rw
docker rm rw

set -e

command="docker create"

# Get all the env keys and pass in from the host
str=$(egrep -v '^#' .env | xargs)
IFS=" "
ary=($str)
for key in "${!ary[@]}";
do
  str2="${ary[$key]}"
  IFS="="
  ary2=($str2)
  command="${command} -e ${ary2[0]}"
done

command="${command} -it --name=rw remember-when yarn install && yarn deploy -t main-app --deploy-env alpha-deploygate --android"

# Execute the docker run command with all the env set
eval $command

docker cp . rw:/App
docker start rw
docker logs --follow rw
docker stop rw
docker rm rw