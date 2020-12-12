
all: test combine-reports generate-report

mkdir:
	mkdir ./cypress/screenshots

test: mkdir
	yarn test

combine-reports:
	mkdir mochawesome-report && npx mochawesome-merge cypress/reports/mocha/*.json > mochawesome-report/report-$$(date +'%Y%m%d-%H%M%S').json

generate-report:
	npx marge mochawesome-report/*.json -f report-$$(date +'%Y%m%d-%H%M%S') -o mochawesome-report

slack:
	yarn slack:ci

slack-local:
	yarn slack:local