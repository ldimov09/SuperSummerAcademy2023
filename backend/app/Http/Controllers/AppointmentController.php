<?php

namespace App\Http\Controllers;

use App\Models\Appoitment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AppointmentController extends Controller
{
    //

    /*
    public function getAll(Request $request)
    {
        

        $all = Appoitment::get()->toJson();
        $queryParam = $request->query('date');

        return response()->json(['message' => 'Records read successfully', 'data' => $all]);
    }*/

    public function getAllFreeHours(Request $request)
    {
        $queryParam = $request->input('date');

        if (!$queryParam) {
            return response()->json(['error' => 'Date parameter is missing.'], 400);
        }

        // Convert the date parameter into a format suitable for database querying
        $startDate = date('Y-m-d H:i:s', strtotime($queryParam . ' 00:00:00'));
        $endDate = date('Y-m-d H:i:s', strtotime($queryParam . ' 23:59:59'));

        // Get all appointments for the given date
        $appointments = Appoitment::whereBetween('date_time', [$startDate, $endDate])->get();

        // Extract the time from each appointment in hh:mm format
        $bookedHours = $appointments->map(function($appointment) {
            return date('H:i', strtotime($appointment->date_time));
        })->toArray();

        // Available hours
        $hours = array('08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00');

        // Find the difference between the $hours array and the extracted times
        $availableHours = array_diff($hours, $bookedHours);

        return response()->json($availableHours);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'guest_count' => 'required|integer',
            'date_time' => 'required|string',
        ]);

        $date = \Carbon\Carbon::parse($request->date_time);

        
        $date->format('Y-m-d');
        $date->format('H:i:s');

        //$date = Carbon::createFromFormat('m/d/Y', $request->date_time);

        $record = new Appoitment;
        $record->name = $request->name ?? '';
        $record->email = $request->email ?? '';
        $record->guest_count = $request->guest_count ?? 0;
        $record->date_time = $date ?? '';

        $record->save();

        if ($record) {
            return response()->json(['message' => 'Record created successfully', 'data' => $record]);
        }

    }
}