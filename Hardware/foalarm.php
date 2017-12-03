<?php
require_once 'firebaseLib.php';
// --- This is your Firebase URL
$url = 'https://angularfireapp-c5e67.firebaseio.com';
// --- Use your token from Firebase here
$token = '03xlhASCsq6ciMRfjaar8YNCSPaXi6kvvjPjBHEu';
// --- Here is your parameter from the http GET
$arduino_data = $_GET['arduino_data'];
// --- $arduino_data_post = $_POST['name'];
// --- Set up your Firebase url structure here
$firebasePath = '/accelorometer/';
/// --- Making calls
$fb = new fireBase($url, $token);
$response = $fb->push($firebasePath, $arduino_data);
sleep(2);