<?php

$company_search_api = "https://api.prosperworks.com/developer_api/v1/companies";
$people_search_api = "https://api.prosperworks.com/developer_api/v1/people";
$people_create_api = "bear_quiz/PW_people_create.json";
$opportunity_create_api = "bear_quiz/PW_opportunity_create.json";

// Find this company
$find_company = "Dunder Mifflin";
$find_person = "Pam Halpert";

$header = "X-PW-AccessToken: cde1f9a99640b29fd761e17d549e8cde\r\n"
          ."X-PW-Application: developer_api\r\n"
          ."X-PW-UserEmail: larrypham1991@gmail.com\r\n"
          ."Content-Type: application/json\r\n";

$opts = [
  'http' => [
    'method' => 'POST',
    'header' => $header,
  ]
];
$context = stream_context_create($opts);

echo "Finding Company $find_company\n";
$company_data = file_get_contents($company_search_api."/search", false, $context);
$company_json_data = json_decode( $company_data );

$company = array_filter( $company_json_data, function ($c) use ($find_company){
    if( strpos($c->name, $find_company) !== false ){
      return $c;
    }
});

if(sizeof($company) === 0){
  echo "ERROR Company $find_company not found\n";
  return;
}

// set the current company ID
$company = current( $company );
$company_id = $company->id;

// Create POST request to update data
echo "Looking for Person\n";
$people_data = file_get_contents($people_search_api."/search", false, $context);
$people_json_data = json_decode( $people_data );

// var_dump($people_json_data);
$people = array_filter( $people_json_data, function ($p) use ($find_person){
    if( strpos($p->name, $find_person) !== false ){
      return $p;
    }
});

if(sizeof($people) > 0){
  echo "Person $find_person Already Exists\n";
  return;
}

// Associate the person with the company
echo "Create new person associated with company $company->name\n";
$person_data = file_get_contents($people_create_api, false, $context);
$person = json_decode( $person_data );

// change old name to new name
$person->company_id = $company_id;
$person->name = "Pam Halpert";
$person_id = $person->id;


// create PUT request to update data for the person data
$opts2 = [
  'http' => [
    'method' => 'PUT',
    'header' => $header,
    'content' => json_encode($person),
  ]
];
$context2 = stream_context_create($opts2);

// update data with new content data for person
echo "Update Person Data\n";
$people_data_update = file_get_contents($people_search_api."/".$person_id, false, $context2);
$people_json_data_update = json_decode( $people_data );

// create new opportunity
echo "Create New opportunity!\n";
$opportunity_data = file_get_contents($opportunity_create_api, false, $context);
$opportunity = json_decode( $opportunity_data );

// update the opportunity skeleton with necessary information
echo "Assign opportunity data\n";
$opportunity->name = "Sell 20,000 post-it notes to Pam";
$opportunity->assignee_id = $person_id;
$opportunity->details = "20,000 post-it notes";
$opportunity->company_id = $company_id;

// create PUT request to update data for the opportunity
$opts3 = [
  'http' => [
    'method' => 'POST',
    'header' => $header,
    'content' => json_encode($opportunity),
  ]
];
$context3 = stream_context_create($opts3);

// create POST request to update all the
$opportunity_data = file_get_contents($opportunity_create_api, false, $context3);

echo "SUCCESSFULLY UPDATED!\n";

 ?>
