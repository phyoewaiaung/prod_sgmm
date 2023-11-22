<?php

namespace App\Exports;

use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Sheet;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;


// create custom macro to set cell style by using `phpspreadsheet library` that are not available in laravel-excel package
Sheet::macro('styleCells', function (Sheet $sheet, string $cellRange, array $style) {
    $sheet->getDelegate()->getStyle($cellRange)->applyFromArray($style);
});

// create custom macro to merge cell by using `phpspreadsheet library` that are not available in laravel-excel package
Sheet::macro('mergeCells', function (Sheet $sheet, string $cellRange) {
    $sheet->getDelegate()->mergeCells($cellRange);
});


class InvoiceExport implements WithHeadings, WithEvents, WithTitle
{
    public $exportData;
    public $endTableColumn;
    public $tableHeader;
    public function __construct($exportData, $tableHeader)
    {
        $this->exportData = $exportData;
        $this->tableHeader = $tableHeader;
    }

    public function headings(): array
    {
        return [
            $this->tableHeader
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                # style array
                $styleArray = [
                    'headerFont' => [
                        'bold' => true,
                        'size' => 14
                    ],
                    'centerAlign' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'verticalAlign' => [
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'tableHeader' => [
                        'bold' => true
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['rgb' => config('EXCEL_HEADER_BG_COLOR')]
                    ],
                    'borderStyle' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                        ]
                    ],
                    'red' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['rgb' => 'B0E0E6'] //for blue color
                    ],
                ];
                $this->setColumnWidth($event, count($this->tableHeader));
                $this->setTitleAndStyle($event, $styleArray);
                $this->setExportdata($event, $styleArray);
                $event->sheet->getDelegate()->getRowDimension(1)->setRowHeight(50);
                $event->sheet->getDelegate()->getStyle('A1:AZ1')->getAlignment()->setWrapText(true);
            }
        ];
    }

    public function setColumnWidth($event, $headerCount)
    {
        $index = config('ZERO');
        $headerCount -= config('ONE');
        # prepare column width as dynamic

        $letters = [];
        foreach (range('A', 'Z') as $first) {
            array_push($letters, $first);
        }

        foreach (range('A', 'A') as $second) {
            foreach (range('A', 'Z') as $third) {
                array_push($letters, $second . $third);
            }
        }
        foreach ($letters as $alphabet) {
            # check loop count is greater than column count, it mean, terminate loop
            if ($headerCount > $index) {
                $event->sheet->getColumnDimension("A")->setWidth(30);
                # set column width
                if ($alphabet == "D" || $alphabet == "H") {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(20);
                } elseif ($alphabet == "J") {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(25);
                } else {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(17);
                }
                $this->endTableColumn = $alphabet;
            } else {
                break;
            }
            $index++;
        }
    }

    public function setExportdata($event, $styleArray)
    {
        $row = 2;
        $no = 1;
        $lastExcelRow = count($this->exportData);
        $totalMins = $totalOtDays = config('ZERO');
        # set ovetime data
        foreach ($this->exportData as $key => $data) {
            $event->sheet->setCellValue("A" . $row, $data["date"]);
            $event->sheet->setCellValue("B" . $row, $data["collection_status"]);
            $event->sheet->setCellValue("C" . $row, $data["____"]);
            $event->sheet->setCellValue("D" . $row, $data["receipt_no"]);
            $event->sheet->setCellValue("E" . $row, $data["location"]);
            $event->sheet->setCellValue("F" . $row, $data["box"]);;
            $event->sheet->setCellValue("G" . $row, $data["sender_name"]);
            $event->sheet->setCellValue("H" . $row, $data["sender_address"]);
            $event->sheet->setCellValue("I" . $row, $data["sender_contact_no"]);
            $event->sheet->setCellValue("J" . $row, $data["sea_or_air"]);
            $event->sheet->setCellValue("K" . $row, $data["details_of_cargo"]);
            $event->sheet->setCellValue("L" . $row, $data["weight"]);
            $event->sheet->setCellValue("M" . $row, $data["ygn_home_pickup"]);
            $event->sheet->setCellValue("N" . $row, $data["what_sending"]);
            $event->sheet->setCellValue("O" . $row, $data["how_in_sg"]);
            $event->sheet->setCellValue("P" . $row, $data["payment_type"]);
            $event->sheet->setCellValue("Q" . $row, $data["receiver_name"]);
            $event->sheet->setCellValue("R" . $row, $data["receiver_address"]);
            $event->sheet->setCellValue("S" . $row, $data["receiver_postalcode"]);
            $event->sheet->setCellValue("T" . $row, $data["receiver_contact_no"]);
            $event->sheet->setCellValue("U" . $row, $data["food_weight"]);
            $event->sheet->setCellValue("V" . $row, $data["food_price"]);
            $event->sheet->setCellValue("W" . $row, $data["clothes_weight"]);
            $event->sheet->setCellValue("X" . $row, $data["clothes_price"]);
            $event->sheet->setCellValue("Y" . $row, $data["frozen_food_weight"]);
            $event->sheet->setCellValue("Z" . $row, $data["frozen_food_price"]);
            $event->sheet->setCellValue("AA" . $row, $data["other_weight"]);
            $event->sheet->setCellValue("AB" . $row, $data["other_price"]);
            $event->sheet->setCellValue("AC" . $row, $data["cosmetic_weight"]);
            $event->sheet->setCellValue("AD" . $row, $data["cosmetic_price"]);
            $event->sheet->setCellValue("AE" . $row, $data["email"]);
            $event->sheet->setCellValue("AF" . $row, $data["addational_instruction"]);
            $event->sheet->setCellValue("AG" . $row, $data["storage_type"]);
            $event->sheet->setCellValue("AH" . $row, $data["how_in_ygn"]);
            $event->sheet->setCellValue("AI" . $row, $data["sg_home_pickup"]);
            $event->sheet->setCellValue("AJ" . $row, $data["total_price"]);
            $event->sheet->setCellValue("AK" . $row, $data["total_weight"]);
            $event->sheet->setCellValue("AL" . $row, $data["no_of_package"]);
            $event->sheet->setCellValue("AM" . $row, $data["received"]);
            $event->sheet->setCellValue("AN" . $row, $data["balance"]);
            $event->sheet->setCellValue("AO" . $row, $data["handling"]);

            $endTableRow = $row;

            if ($lastExcelRow > $no) {
                $row++;
                $no++;
            }
        }
    }

    public function setTitleAndStyle($event, $styleArray)
    {
        # set title style
        $event->sheet->styleCells(
            'A1:AO1',
            [
                'font' => $styleArray['tableHeader'],
                'alignment' => $styleArray['centerAlign']
            ]

        );
    }

    public function title(): string
    {
        return "Monthly Invoice";
    }
}
