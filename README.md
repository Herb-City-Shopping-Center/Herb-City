# Herb-City
docker build -t sahanrandika/user-service .
docker run -d -p 5000:5000 sahanrandika/user-service

kubectl apply -f deplservice.yml
kubectl apply -f services.yml

-------------AF-----------
You should show evidence of testing your application by including test cases
unit tests (using JEST), and test cases should be provided
Deploy the project

https://blog.itsrakesh.co/how-to-write-tests-in-full-stack-mern-web-application

npm config set legacy-peer-deps true

npm install --legacy-peer-deps
